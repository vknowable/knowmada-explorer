import Image from "next/image"

export default function Footer() {
  return (
<footer>
    <div className="bg-gradient-to-b from-primary/10 to-primary/5 pt-20 pb-8 text-zinc-400 border-t-2">
      <div className="container px-4 mx-auto">
        <div className="-mx-4 flex flex-wrap justify-between">
          <div className="flex flex-row">
          <div className="px-4 my-4 w-full xl:w-1/5 flex items-center">
            <Image src="/assets/knowable-logo.png" height="200" width="200" alt="Knowable logo" className="shadow-xl dark:shadow-gray-800 rounded h-auto w-64 opacity-70"/>
          </div>

          <div className="mx-8 px-4 my-4 w-full sm:w-auto">
            <div>
              <h2 className="inline-block text-xl pb-4 mb-4 border-b-2 text-zinc-400">Source code</h2>
            </div>
            <ul className="leading-8 text-sm">
              <li>Front end:<a href="https://github.com/vknowable/knowmada-explorer" className="hover:text-zinc-300 transition-all ml-2">https://github.com/vknowable/knowmada-explorer</a></li>
              <li>Back end:<a href="https://github.com/vknowable/namada-indexer" className="hover:text-zinc-300 transition-all ml-2">https://github.com/vknowable/namada-indexer</a></li>
              <li>Based on Namada-Indexer:<a href="https://github.com/anoma/namada-indexer" className="hover:text-zinc-300 transition-all ml-2">https://github.com/anoma/namada-indexer</a></li>
            </ul>
          </div>
          </div>
          
          <div className="px-4 my-4 w-full sm:w-auto">
            <div>
              <h2 className="inline-block text-xl pb-4 mb-4 border-b-2 text-zinc-400">Links</h2>
            </div>
            <ul className="leading-8 text-sm">
              <li><a href="https://testnet.luminara.icu/" className="hover:text-zinc-300 transition-all">Campfire</a></li>
              <li><a href="https://luminara.ghost.io/" className="hover:text-zinc-300 transition-all">Luminara Blog</a></li>
            </ul>
          </div>

          <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5 flex flex-col items-end">
            <div>
              <h2 className="inline-block text-xl pb-4 mb-4 border-b-2 text-zinc-400">Say hi</h2>
            </div>
            <div className="flex justify-end w-full gap-1">
            <a href="https://twitter.com/_luminara" className="inline-flex items-center justify-center h-8 w-8 border text-zinc-400 rounded-full mr-1 hover:text-zinc-300 transition-all hover:border-white/60">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </a>

            <a href="https://github.com/vknowable" className="inline-flex items-center justify-center h-8 w-8 border text-zinc-400 rounded-full mr-1 hover:text-zinc-300 transition-all hover:border-white/60">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-[#033] py-4 text-zinc-400">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap justify-between">
          <div className="px-4 w-full text-center sm:w-auto sm:text-left">
            Created 2024 - by Knowable (MIT License)
          </div>
          <div className="px-4 w-full text-center sm:w-auto sm:text-left">
          &ldquo;Ecosystems, not monopolies.&rdquo;
          </div>
        </div>
      </div>
    </div>
</footer>
  )
}
