import { getTagline } from '@/lib/api'
import { defaultHome } from '@/lib/data'
import { Fragment } from 'react'
import NextImage from 'next/image'
import SEO from '@/components/Seo'
import { deploymentUrl } from '@/lib/data'
import { shimmer, toBase64 } from '@/lib/shimmer'
import SocialLinks from '@/components/social-links'
import imageHolder from '../public/static/favicon-image.jpg'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const Home = ({ homeTagline }) => {
  return (
    <Fragment>
      <SEO canonical={deploymentUrl} />
      <div className="min-h-[90vh] flex flex-col justify-center md:justify-auto md:flex-row md:items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
          <div className="md:hidden filter">
            <NextImage
              width={120}
              height={120}
              quality={30}
              placeholder="blur"
              className="grayscale rounded-full"
              src={`${deploymentUrl}/static/favicon-image.jpg`}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
            />
          </div>
          <h1 className="mt-5 md:mt-0 font-bold text-2xl sm:text-5xl">Jane Doe</h1>
          <h2 className="text-center md:text-left mt-5 text-lg sm:text-xl text-gray-500 dark:text-white">
            Creation of Rishi Raj Jain
          </h2>
          <div className="flex flex-row space-x-5">
            <SocialLinks />
          </div>
          <div className="mt-10 bg-gray-200 dark:bg-gray-700 h-[1px] w-full"></div>
          <h2
            dangerouslySetInnerHTML={{
              __html: new RichTextResolver().render(homeTagline),
            }}
            className="text-center md:text-left mt-10 text-md sm:text-lg text-gray-500 dark:text-white"
          ></h2>
        </div>
        <div className="hidden md:w-1/2 md:flex flex-col items-end justify-center">
          <div className="filter grayscale">
            <NextImage
              width={330}
              height={440}
              quality={50}
              src={imageHolder}
              placeholder="blur"
              className="rounded object-cover"
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home

export async function getStaticProps() {
  // Once deployed directly fetch from the `deployedUrl/api/home`, look at github.com/rishi-raj-jain/rishi.app for future reference.
  try {
    const homeTagline = (await getTagline('home')) || defaultHome
    return {
      props: { homeTagline },
      revalidate: 60,
    }
  } catch {
    return { notFound: true }
  }
}
