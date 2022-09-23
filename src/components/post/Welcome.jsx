import background from '/assets/Charco-Build.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Welcome = () => {
  const { name } = useSelector(state => state.auth)
  
  return (
    <>
      <div className='hero min-h-screen animate-fade' style={{ backgroundImage: `url(${background})` }}>
        <div className='hero-overlay bg-opacity-70' />
        <div className='hero-content text-center text-neutral-content'>
          <div className='max-w-md'>

            <h1 className='mb-5 leading-tight text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-800 via-rose-800 to-red-700'>
              <span className='text-transparent bg-clip-text bg-gradient-to-br from-sky-800 via-sky-700 to-red-800'>
                Welcome {name}
              </span>{' '}
              to the lovely recyclable platform!
            </h1>
            <hr className='my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700'></hr>
            <div className='mb-5'>
              <p>
                You don't need it anymore, but it's not 'trash', please share it on here first before
                throwing it away. Or stick it on the road and take a snap!
              </p>
              <p>
                You might spot something nice on your travels looking abandoned, take a snap and
                post it, make somebody day!
              </p>
              <ul className='mt-5'>
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
            <hr className='my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700'></hr>
            <button className='btn btn-primary'><Link to='home'>Get Started</Link></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
