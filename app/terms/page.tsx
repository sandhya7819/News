import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of use</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Disclaimers</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Limitation on Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Copyright Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Dolor sit amet consectetur adipisicing elit. Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">General</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Sit amet consectetur adipisicing elit. Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-center mb-4">
            Do you agree to our terms?
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

