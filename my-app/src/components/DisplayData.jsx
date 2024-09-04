import { useEffect, useState } from "react";
import "../asset/style/data.css"

const DisplayData = () => {
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/comments');
                const data = await response.json()
                setData(data)

            } catch (error) {
                console.error(error.message);
            }
        }
        getData()
    }, [])



    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchData.toLowerCase()) ||
            item.email.toLowerCase().includes(searchData.toLowerCase()) ||
            item.body.toLowerCase().includes(searchData.toLowerCase())
        )
    })

    const lastPagination = currentPage * itemPerPage
    const firstPagination = lastPagination - itemPerPage
    const currentItems = filteredData.slice(firstPagination, lastPagination)

    const totalPages = Math.ceil(filteredData.length / itemPerPage);

    const handleChange = (p) => {
        setCurrentPage(p)
    }
    return (
        <>
            <h1>Show Data</h1>
            <div>
                <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="search here..."
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                />
            </div>
            <table className="border">
                <thead>
                    <tr className="border">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.body}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">No Data Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => handleChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                
                <button
                    onClick={() => handleChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default DisplayData