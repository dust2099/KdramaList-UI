import Navbar from '../components/Navbar'
import { Button } from "@/components/ui/button"

function Hero() {
    return (
        <>
            <Navbar />
            
            <div className="flex justify-center items-center h-screen bg-gray-600">
                <div className="text-center bg-amber-400">
                    <h1 className="text-3xl font-bold mx-auto">K-Drama List</h1>
                    <Button className="ml-4">Get Started</Button>
                </div>
                
                
            </div>
        </>
    )
}

export default Hero