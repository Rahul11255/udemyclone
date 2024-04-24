import { useEffect, useState } from "react";

const Timer = () => {

       
    const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const offerEndTime = new Date("2024-04-28T00:00:00"); // Replace with your offer's end time
        const timer = setInterval(() => {
            const now = new Date();
            const distance = offerEndTime - now;

            if (distance < 0) {
                // Offer has expired
                setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setRemainingTime({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    console.log("hello");

  return (
    <h3>Ends in {remainingTime.days}d {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s.</h3>
  )
}

export default Timer