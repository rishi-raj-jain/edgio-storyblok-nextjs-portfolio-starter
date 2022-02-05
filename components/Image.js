import NextImage from 'next/image'
import { shimmer, toBase64 } from '@/lib/shimmer'

const Image = ({ src, alt, title }) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      quality={1}
      height={720}
      width={1400}
      title={title}
      placeholder="blur"
      objectFit="contain"
      layout="responsive"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
    />
  )
}

export default Image
