import logo from '/assets/reciclable.svg'
import background from '/assets/Charco-Build.png'
import logoRecyclable from '/assets/png-transparent-recycling-symbol-logo-sustainable-development-recyclable-text-label-recycling.png'
const Welcome = () => {
  return (
    <>
      <div className='hero min-h-screen' style={{ backgroundImage: `url(${background})` }}>
        <div className='hero-overlay bg-opacity-70' />
        <div className='hero-content text-center text-neutral-content'>
          <div className='max-w-md'>
            <div className='inline-block w-1/6'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='15 15 720 720'>
                <circle cx='375' cy='375' r='360' />
                <path
                  fill='darkred'
                  fill-opacity="0.8"
                  d='M212 467l150 10-5 128-106-7c-82-34-47-127-39-131zm164-279l-84 125-108-68 59-88c70-54 133 23 133 32v-1zm161 282l-66-135 113-60 47 95c12 88-86 104-94 99v1zM353 130c51 2 140-10 154 13l51 60 42-19-80 105-127 1 53-28c-17-50-40-99-93-132zm245 349c-28 43-62 126-88 127l-77 14-5 46-51-122 63-110-2 60c52 10 106 15 161-15h-1zm-424 38c-24-46-78-117-66-140l26-74-37-27 131 17 64 109-51-32c-35 40-66 84-68 147'
                />
              </svg>
            </div>
            <h1 className='mb-5 leading-tight text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-800 via-rose-800 to-red-700'>
              <span className='bg-clip-text bg-gradient-to-br from-sky-800 via-sky-700 to-red-800'>
                Welcome
              </span>{' '}
              to the lovely recyclable platform!
            </h1>
            <div className='mb-5'>
              <p>
                Don't need it anymore, but its not 'trash', please share it on here first before
                throwing it away. Or stick it on the road and take a snap!
              </p>
              <p>
                You might spot something nice on your travels looking abandoned, take a snap and
                post it, make somebody day!
              </p>
              <ul>
                <li>BUILDING MATERIALS</li>
                <li>WIERD STAFF</li>
                <li>FURNITURE</li>
                <li>PAINT</li>
                <li>GOLD DUST</li>
                <li>PLANTS</li>
                <li>CONTAINERS</li>
                <li>FOAM</li>
                <li>PARTICULARLY NICE PALETTES</li>
                <li>ETC</li>
              </ul>
            </div>
            <button className='btn btn-primary'>Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
