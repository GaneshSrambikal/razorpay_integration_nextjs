'use client'
//@ts-nocheck
import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

type MouseEvent = React.MouseEvent<HTMLButtonElement>
const ProductCard = () => {
    const [amount, setAmount] = useState(259900)
    const { toast } = useToast()
    const handlePayment = async (e: MouseEvent) => {
        e.preventDefault();
        const currency: string = 'INR';
        const receiptId: string = '123456789';
        const orders = await fetch(`${process.env.BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId
            })
        })
        const response = await orders.json()
        console.log(response)
        const option: object = {
            key: '',
            amount,
            currency,
            name: 'Online Store',
            description: 'Test Transaction',
            image: '',
            order_id: response.id,
            handler: async function (res: any) {
                console.log(res)
                const body = { ...res }

                const validate = await fetch(`${process.env.BASE_URL}/validate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                const jsonRes = await validate.json()
                console.log(jsonRes);
                toast({
                    title: 'Order Successful',
                    description: `You have purchase Flight jacket Rs.${new Intl.NumberFormat().format(Number(amount / 100))}`
                })


            },
            prefill: {
                name: 'Saas Prod',
                email: 'sassprod@gmail.com',
                contact: '900000000',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3388cc',
            },

        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const rzp1 = new Razorpay(option)
        rzp1.on('payment failed', function (res: any) {
            alert(res.error.code)
        })
        rzp1.open()
    }
    return (
        <>


            <div>
                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto py-12 px-4 bg-white rounded-lg border-black border">
                    <div>
                        <img
                            src="https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2Fe5%2F7f%2Fjacket-5-1-d1cb5.jpg?fit=max&w=720&q=90"
                            alt="Product Image"
                            width="600"
                            height="600"
                            className="w-full rounded-lg"
                        // style="aspect-ratio: 600 / 600; object-fit: cover;"
                        />
                    </div>
                    <div className="grid gap-6">
                        <div>
                            <h1 className="text-3xl font-bold">FLIGHT Jacket Green</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                The ultimate Nylon Flight jacket. Super comfort and stylish.
                            </p>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col justify-start items-start">
                                <span className="text-xl font-extralight line-through text-gray-400">Rs.5999 /-</span>
                                <span className="text-3xl font-bold">{`Rs.${new Intl.NumberFormat().format(amount / 100)}/-`}</span>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-primary/90 h-10 px-4 py-2">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

           
        </>
    )
}

export default ProductCard