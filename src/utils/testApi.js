import fetch from 'node-fetch'

const testSubmission = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/submit-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        service: 'LinkedIn Premium'
      })
    })

    const data = await response.json()
    console.log('Test response:', data)
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testSubmission()