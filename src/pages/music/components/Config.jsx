export default function Config ({
  setBpm, setBpc, setChangeOneCard, setCardToChangeId,
  setMode, setTimeOfAddBeat, setTimeOfChange, setStart, mode, bpm, bpc,
  changeOneCard, cardToChangeId
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    if (e.target.id === 'bpm') {
      setBpm(e.target.value)
    } else if (e.target.id === 'bpc') {
      setBpc(e.target.value)
    } else if (e.target.id === 'changeType') {
      setChangeOneCard(e.target.checked)
    } else if (e.target.id === 'ctc') {
      setCardToChangeId(e.target.value)
    }
  }

  const handleMode = (e) => {
    const btn = e.target
    if (btn.textContent === 'Manual') {
      setMode('manual')
      setBpm('')
      setBpc('')
      setTimeOfAddBeat('')
      setTimeOfChange(0)
      setStart(false)
    } else if (btn.textContent === 'Automatic') {
      setMode('automatic')
    }
  }

  return (
    <div>
      {mode
        ? mode === 'automatic'
          ? <form onSubmit={handleSubmit}>
            <div className='flex flex-wrap'>
              <div className='my-5 mr-5 flex flex-col'>
                <label htmlFor='bpm'>Bpm</label>
                <input onChange={handleChange} value={bpm} type='number' className='rounded text-black' id='bpm' placeholder='Bpm' />
              </div>
              <div className='my-5 mr-5 flex flex-col'>
                <label htmlFor='bpc'>Bpc</label>
                <input onChange={handleChange} value={bpc} type='number' className='rounded text-black' id='bpc' placeholder='Beats for change' />
              </div>
              {changeOneCard
                ? <div className='my-5 mr-5 flex flex-col'>
                  <label htmlFor='ctc'>Card to change</label>
                  <input onChange={handleChange} value={cardToChangeId} type='number' className='rounded text-black' id='ctc' placeholder='Number of card' />
                  </div>
                : ''}
            </div>
            </form>
          : ''
        : ''}
      <div>
        <button className='bg-indigo-600 py-2.5 px-5 rounded mr-10 mt-3' onClick={handleMode}>Manual</button>
        <button className='bg-green-500 py-2.5 px-5 rounded mr-10 mt-3' onClick={handleMode}>Automatic</button>
        <div className='mt-3'>
          <label htmlFor='changeType'>Change only one card:</label>
          <input type='checkbox' className='rounded checked:bg-red-700 ml-2' onClick={handleChange} id='changeType' value={changeOneCard} />
        </div>
      </div>
    </div>
  )
}
