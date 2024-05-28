import React from 'react'

async function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a successful fetch or an error

      let r = parseFloat(Math.random().toFixed(2))

      if (r > 0.5) {
        resolve(`Passed: ${r}`)
      } else {
        reject(`Failed: ${r}`)
      }
    }, 50)
  })
}

const FetchedData = async () => {

  let cleanData

  try {
    cleanData = await fetchData()

  } catch(error: any) {

    return (
      <div className="py-2 text-xs">
        <p>Mock Error: {(error)}</p>
      </div>
    );
  }

  
  return (
    <div className="py-2 text-xs">
      {cleanData}
    </div>
  )
}

export default FetchedData