import Link from 'next/link'
import { useState } from 'react'

const SearchBar = ({ content }) => {
  const [searcValue, setSearcValue] = useState('')
  const [results, setResults] = useState(content)
  return (
    <div className="relative mt-5">
      <input
        value={searcValue}
        onChange={(e) => {
          setSearcValue(e.target.value)
          if (e.target.value.length > 0)
            setResults(
              content.filter((item) => {
                return (
                  item.content.title.includes(searcValue) ||
                  item.content.intro.includes(searcValue) ||
                  item.content.long_text.includes(searcValue)
                )
              })
            )
        }}
        placeholder="Search Posts..."
        className="border dark:border-gray-600 outline-none rounded-lg bg-white py-2 px-5 bg-white dark:bg-black text-sm w-1/2"
      />
      {searcValue.length > 0 && results.length > 0 && (
        <div className="mt-2 shadow top-10">
          {results.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} passHref>
              <a>
                <div className="py-3 px-5 border-t flex flex-col">
                  <span className="py-1 font-bold text-md">{item.content.title}</span>
                  <span className="py-1 text-sm">{item.content.intro}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
