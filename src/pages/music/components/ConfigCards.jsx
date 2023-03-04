export default function ConfigCards ({ cards, setFirstCardToExclude, setSecondCardToExclude, firstCardToExclude, secondCardToExclude }) {
  const handleChange = (e) => {
    if (e.target.checked) {
      const parent = e.target.parentNode
      const grandParent = parent.parentNode
      const grandGrandParentId = parseInt(grandParent.parentNode.id)
      const id = e.target.id
      if (grandGrandParentId === 0) {
        setFirstCardToExclude(firstCardToExclude.concat(id))
      } else if (grandGrandParentId === 1) {
        setSecondCardToExclude(secondCardToExclude.concat(id))
      }
    } else {
      const parent = e.target.parentNode
      const grandParent = parent.parentNode
      const grandGrandParentId = parseInt(grandParent.parentNode.id)
      const id = e.target.id
      if (grandGrandParentId === 0) {
        const newArray = firstCardToExclude.filter((item) => item !== id)
        setFirstCardToExclude(newArray)
      } else if (grandGrandParentId === 1) {
        const newArray = secondCardToExclude.filter((item) => item !== id)
        setSecondCardToExclude(newArray)
      }
    }
  }

  return (
    <>
      <p className='text-xl mb-5'>Symbol that you want to exclude:</p>
      <div className='grid grid-cols-2 gap-4'>
        {cards.map(card => (
          <div key={card.id}>
            <input type='checkbox' className='rounded checked:bg-slate-700 mr-2' id={card.id} onChange={handleChange} />
            <label className='form-check-label'>{card.id}</label>
          </div>
        ))}
      </div>
    </>
  )
}
