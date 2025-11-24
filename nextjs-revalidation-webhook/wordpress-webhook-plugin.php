<?php
/**
 * Plugin Name: Next.js Revalidation Webhook
 * Plugin URI: https://github.com/yourusername/nextjs-revalidation-webhook
 * Description: Automatically triggers Next.js revalidation when posts, pages, or categories are created, updated, or deleted.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: nextjs-revalidation-webhook
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class NextJS_Revalidation_Webhook {
    
    private $webhook_url;
    private $secret;
    
    public function __construct() {
        // Get webhook URL from WordPress options (set in Settings)
        $this->webhook_url = get_option('nextjs_webhook_url', 'http://localhost:3000/api/revalidate');
        $this->secret = get_option('nextjs_webhook_secret', 'MY_SECRET');
        
        // Hook into post save/delete
        add_action('save_post', array($this, 'revalidate_on_post_save'), 10, 3);
        add_action('delete_post', array($this, 'revalidate_on_post_delete'), 10, 1);
        add_action('wp_trash_post', array($this, 'revalidate_on_post_delete'), 10, 1);
        
        // Hook into page save/delete
        add_action('save_post_page', array($this, 'revalidate_on_page_save'), 10, 3);
        add_action('delete_post', array($this, 'revalidate_on_page_delete'), 10, 1);
        
        // Hook into category create/update/delete
        add_action('created_category', array($this, 'revalidate_on_category_change'), 10, 2);
        add_action('edited_category', array($this, 'revalidate_on_category_change'), 10, 2);
        add_action('delete_category', array($this, 'revalidate_on_category_delete'), 10, 4);
        
        // Add admin settings page
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }
    
    /**
     * Revalidate when post is saved (created or updated)
     */
    public function revalidate_on_post_save($post_id, $post, $update) {
        // Skip revisions and autosaves
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }
        
        // Only process published posts
        if ($post->post_status !== 'publish' && $post->post_status !== 'draft' && $post->post_status !== 'pending') {
            return;
        }
        
        // Skip if not a post
        if ($post->post_type !== 'post') {
            return;
        }
        
        $this->send_webhook(array(
            'post' => array(
                'id' => $post_id,
                'slug' => $post->post_name,
                'type' => $post->post_type,
                'status' => $post->post_status,
            ),
            'action' => $update ? 'updated' : 'created',
        ));
    }
    
    /**
     * Revalidate when post is deleted
     */
    public function revalidate_on_post_delete($post_id) {
        $post = get_post($post_id);
        
        if (!$post || $post->post_type !== 'post') {
            return;
        }
        
        $this->send_webhook(array(
            'post' => array(
                'id' => $post_id,
                'slug' => $post->post_name,
                'type' => $post->post_type,
                'status' => 'deleted',
            ),
            'action' => 'deleted',
        ));
    }
    
    /**
     * Revalidate when page is saved
     */
    public function revalidate_on_page_save($post_id, $post, $update) {
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }
        
        if ($post->post_type !== 'page') {
            return;
        }
        
        $this->send_webhook(array(
            'page' => array(
                'id' => $post_id,
                'slug' => $post->post_name,
                'status' => $post->post_status,
            ),
            'action' => $update ? 'updated' : 'created',
        ));
    }
    
    /**
     * Revalidate when page is deleted
     */
    public function revalidate_on_page_delete($post_id) {
        $post = get_post($post_id);
        
        if (!$post || $post->post_type !== 'page') {
            return;
        }
        
        $this->send_webhook(array(
            'page' => array(
                'id' => $post_id,
                'slug' => $post->post_name,
                'status' => 'deleted',
            ),
            'action' => 'deleted',
        ));
    }
    
    /**
     * Revalidate when category is created or updated
     */
    public function revalidate_on_category_change($term_id, $tt_id) {
        $category = get_category($term_id);
        
        if (!$category) {
            return;
        }
        
        $this->send_webhook(array(
            'category' => array(
                'id' => $term_id,
                'slug' => $category->slug,
            ),
            'action' => 'updated',
        ));
    }
    
    /**
     * Revalidate when category is deleted
     */
    public function revalidate_on_category_delete($term_id, $tt_id, $deleted_term, $object_ids) {
        $this->send_webhook(array(
            'category' => array(
                'id' => $term_id,
                'slug' => $deleted_term->slug,
            ),
            'action' => 'deleted',
        ));
    }
    
    /**
     * Send webhook request to Next.js
     */
    private function send_webhook($payload) {
        if (empty($this->webhook_url)) {
            return;
        }
        
        $url = add_query_arg('secret', $this->secret, $this->webhook_url);
        
        $response = wp_remote_post($url, array(
            'method' => 'POST',
            'timeout' => 5,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => false, // Don't wait for response
            'headers' => array(
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode($payload),
            'cookies' => array(),
        ));
        
        // Log errors (optional - remove in production if not needed)
        if (is_wp_error($response)) {
            error_log('Next.js Webhook Error: ' . $response->get_error_message());
        }
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            'Next.js Revalidation Settings',
            'Next.js Revalidation',
            'manage_options',
            'nextjs-revalidation',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('nextjs_revalidation_settings', 'nextjs_webhook_url');
        register_setting('nextjs_revalidation_settings', 'nextjs_webhook_secret');
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1>Next.js Revalidation Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields('nextjs_revalidation_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="nextjs_webhook_url">Webhook URL</label>
                        </th>
                        <td>
                            <input 
                                type="url" 
                                id="nextjs_webhook_url" 
                                name="nextjs_webhook_url" 
                                value="<?php echo esc_attr(get_option('nextjs_webhook_url', 'http://localhost:3000/api/revalidate')); ?>" 
                                class="regular-text"
                                placeholder="http://localhost:3000/api/revalidate"
                            />
                            <p class="description">
                                The full URL to your Next.js revalidation endpoint. 
                                Example: <code>http://localhost:3000/api/revalidate</code> or 
                                <code>https://yourdomain.com/api/revalidate</code>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="nextjs_webhook_secret">Secret Token</label>
                        </th>
                        <td>
                            <input 
                                type="text" 
                                id="nextjs_webhook_secret" 
                                name="nextjs_webhook_secret" 
                                value="<?php echo esc_attr(get_option('nextjs_webhook_secret', 'MY_SECRET')); ?>" 
                                class="regular-text"
                                placeholder="MY_SECRET"
                            />
                            <p class="description">
                                Secret token that matches your Next.js <code>REVALIDATE_SECRET</code> environment variable.
                            </p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
            
            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h2>Test Webhook</h2>
                <p>Click the button below to manually trigger a revalidation:</p>
                <form method="post" action="">
                    <?php wp_nonce_field('test_webhook'); ?>
                    <input type="hidden" name="test_webhook" value="1" />
                    <?php submit_button('Test Webhook', 'secondary', 'test_webhook_submit', false); ?>
                </form>
                <?php
                if (isset($_POST['test_webhook']) && check_admin_referer('test_webhook')) {
                    $this->send_webhook(array(
                        'post' => array(
                            'id' => 0,
                            'slug' => 'test',
                            'type' => 'post',
                            'status' => 'publish',
                        ),
                        'action' => 'updated',
                    ));
                    echo '<div class="notice notice-success"><p>Webhook test sent! Check your Next.js logs.</p></div>';
                }
                ?>
            </div>
        </div>
        <?php
    }
}

// Initialize the plugin
new NextJS_Revalidation_Webhook();

