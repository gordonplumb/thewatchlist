import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <h2 className="text-xl mb-2">
        About
      </h2>
      <div className="mb-2">
        <p>This is a side project that I may or may not continue to maintain. Use at your own risk :)</p>
      </div>
      <div>
        <Image src={'/tmdb_logo.svg'} alt={'TMDB logo'} width='100' height='13' />
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </div>
  )
}
