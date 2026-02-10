
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

const Dashboard = () => {

    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState('')
    const [ma100, setMA100] = useState('')
    const [ma200, setMA200] = useState('')
    const [both,setBoth] = useState()
    const [final, setFinal] = useState('')
    const [mse, setMSE] = useState('')
    const [rmse, setRMSE] = useState('')
    const [r2, setR2] = useState('')

    const accessToken = localStorage.getItem('accessToken')
    useEffect(() => {

        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('protected-view/'
                    // headers : {
                    //     Authorization : `Bearer ${accessToken}`
                    // }
                )

            } catch (error) {
                console.log("Error :", error)
            }
        }
        fetchProtectedData();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axiosInstance.post('/predict/', {
                ticker
            })
            console.log(result.data)
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotURL = backendRoot + result.data.plot_img
            const ma100URL = backendRoot + result.data.plot_100_DMA_img
            const ma200URL = backendRoot + result.data.plot_200_DMA_img
            const finalURL = backendRoot + result.data.plot_prediction
            const bothURL = backendRoot + result.data.plot_100_200_DMA_img
            const MSE = result.data.mse
            const RMSE = result.data.rmse
            const R2 = result.data.r2

            // console.log(plotURL)
            setPlot(plotURL);
            setMA100(ma100URL);
            setMA200(ma200URL);
            setFinal(finalURL);
            setBoth(bothURL);
            setMSE(MSE);
            setRMSE(RMSE);
            setR2(R2);

            if (result.data.error) {
                setError(result.data.error)
            } else {
                setError('')
            }

        } catch (error) {
            console.error('There was an error', error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 ">
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control mb-3" placeholder='Enter the ticker' onChange={(e) => setTicker(e.target.value)} required />
                            {error && <div className='text-danger mb-3'><small>{error}</small></div>}
                            <button type='submit' className="btn btn-info">{loading ? 'loading...' : 'predict stock price'}</button>
                        </form>
                    </div>
                    <div className="prediction mt-5" >
                        <div className="p-3">
                            {
                                plot &&
                                <img src={plot} style={{ maxWidth: '100%' }} />
                            }
                        </div>
                        <div className="p-3">
                            {
                                ma100 &&
                                <img src={ma100} style={{ maxWidth: '100%' }} />
                            }
                        </div>
                        <div className="p-3">
                            {
                                ma200 &&
                                <img src={ma200} style={{ maxWidth: '100%' }} />
                            }
                        </div>
                        <div className="p-3">
                            {
                                both &&
                                <img src={both} style={{ maxWidth: '100%' }} />
                            }
                        </div>
                        <div className="p-3">
                            {
                                final &&
                                <img src={final} style={{ maxWidth: '100%' }} />
                            }
                        </div>
                        {
                            mse &&
                                <div className="text-light p-3">
                                    <h4>Model Evalulation</h4>
                                    <p>Mean Squared Error (MSE): {mse}</p>
                                    <p>Root Mean Squared Error (RMSE): {rmse}</p>
                                    <p>R-Squared: {r2}</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard