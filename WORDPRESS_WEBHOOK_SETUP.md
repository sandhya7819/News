# WordPress Webhook Setup for Automatic Revalidation

## 🎯 Overview

When you add a new blog post in WordPress, it automatically triggers Next.js to regenerate the affected pages. This ensures your site stays updated without manual intervention.

## 🔄 How It Works

1. **Static Generation (SSG)**: All blog pages are pre-generated as static HTML at build time
2. **ISR (Incremental Static Regeneration)**: Pages automatically regenerate every hour in the background
3. **On-Demand Revalidation**: When WordPress webhook fires, pages regenerate immediately

## 📋 Setup Steps

### Step 1: Get Your Revalidation URL

Your Next.js revalidation endpoint:
```
https://your-nextjs-site.com/api/revalidate?secret=YOUR_SECRET&path=/blog/SLUG
```

### Step 2: Install WordPress Plugin

Install one of these plugins:

**Option A: WP Webhooks** (Recommended)
1. WordPress Admin → Plugins → Add New
2. Search "WP Webhooks"
3. Install and Activate

**Option B: Custom Code** (Add to functions.php)

```php
// Add to WordPress theme's functions.php
add_action('save_post', 'trigger_nextjs_revalidation', 10, 3);

function trigger_nextjs_revalidation($post_id, $post, $update) {
    // Only for published posts
    if ($post->post_status !== 'publish' || $post->post_type !== 'post') {
        return;
    }
    
    $nextjs_url = 'https://your-nextjs-site.com/api/revalidate';
    $secret = 'your-secret-key-here';
    $slug = $post->post_name;
    
    // Prepare webhook payload
    $payload = json_encode([
        'post' => [
            'id' => $post_id,
            'slug' => $slug,
            'type' => 'post'
        ],
        'secret' => $secret
    ]);
    
    // Send webhook
    wp_remote_post($nextjs_url, [
        'method' => 'POST',
        'headers' => ['Content-Type' => 'application/json'],
        'body' => $payload,
        'timeout' => 5
    ]);
}
```

### Step 3: Configure Webhook

**Using WP Webhooks Plugin:**

1. WordPress Admin → WP Webhooks → Webhooks
2. Click "Add New Webhook"
3. Configure:
   - **Trigger**: "Post Published" or "Post Updated"
   - **URL**: `https://your-nextjs-site.com/api/revalidate`
   - **Method**: POST
   - **Body**:
   ```json
   {
     "post": {
       "id": "{post_id}",
       "slug": "{post_slug}",
       "type": "post"
     },
     "secret": "your-secret-key"
   }
   ```

### Step 4: Set Environment Variable

Add to `.env.local`:
```env
REVALIDATE_SECRET=your-random-secret-key-here
```

### Step 5: Test Webhook

1. Create a test post in WordPress
2. Publish it
3. Check Next.js logs for revalidation message
4. Visit the blog post page - should show new content

## ⚙️ Scheduled Revalidation (Optional)

For automatic periodic updates, set up a cron job:

### Using Cron (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add this line (runs every hour)
0 * * * * cd /path/to/your/project && npm run revalidate:scheduled
```

### Using Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily/Hourly
4. Action: Start a program
5. Program: `node`
6. Arguments: `scripts/scheduled-revalidation.js`
7. Start in: Your project directory

### Using Vercel Cron (If deployed on Vercel)

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/revalidate",
    "schedule": "0 * * * *"
  }]
}
```

## 🔍 Testing

### Test Manual Revalidation

```bash
# Revalidate homepage
curl -X GET "http://localhost:3000/api/revalidate?path=/&secret=your-secret"

# Revalidate specific blog post
curl -X GET "http://localhost:3000/api/revalidate?path=/blog/my-post-slug&secret=your-secret"

# Revalidate all common paths
curl -X POST "http://localhost:3000/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret"}'
```

### Test WordPress Webhook

1. Create a new post in WordPress
2. Publish it
3. Check browser console or server logs for revalidation message
4. Visit the post URL - should show immediately

## 📊 Revalidation Flow

```
WordPress Post Published
         ↓
WordPress Webhook Fires
         ↓
POST /api/revalidate
         ↓
Next.js Revalidates:
  - /blog/[slug] (specific post)
  - / (homepage)
  - /blog (blog listing)
  - /latest (latest posts)
         ↓
Pages Regenerated
         ↓
New Content Live!
```

## 🐛 Troubleshooting

### Webhook Not Firing

1. Check WordPress plugin is active
2. Verify webhook URL is correct
3. Check WordPress error logs
4. Test webhook manually with curl

### Pages Not Updating

1. Check Next.js logs for revalidation errors
2. Verify REVALIDATE_SECRET matches
3. Check if ISR revalidate time has passed
4. Try manual revalidation

### Rate Limiting

- Add delays between webhook calls
- Use scheduled revalidation instead
- Batch multiple updates

## ✅ Benefits

- ✅ **Fast**: Static pages load instantly
- ✅ **Automatic**: Updates happen automatically
- ✅ **Scalable**: Handles traffic spikes
- ✅ **SEO**: Better search engine indexing
- ✅ **Cost-Effective**: Reduced server load

## 📝 Notes

- ISR revalidates every hour automatically
- Webhook triggers immediate revalidation
- Both work together for best performance
- Pages are cached until revalidation

---

**Status**: Ready to use!  
**Next**: Set up WordPress webhook and test with a new post.

