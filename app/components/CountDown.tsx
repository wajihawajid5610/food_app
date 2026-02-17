'use client'
import  { useEffect, useState } from 'react'
import Countdown from 'react-countdown'

const CountDown = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null // or a placeholder

  const endDate = new Date('2026-12-27')
  return <Countdown date={endDate} className="text-5xl font-bold text-yellow-300" />
}

export default CountDown