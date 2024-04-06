import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Tables = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'John Doe',
            ticketNumber: '12345',
            ratingGrade: 3,
            examGrade: 4,
            comments: 'Good effort',
        },
        {
            id: 2,
            name: 'Jane Smith',
            ticketNumber: '54321',
            ratingGrade: 4,
            examGrade: 3,
            comments: 'Needs improvement',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            ticketNumber: '98765',
            ratingGrade: 5,
            examGrade: 5,
            comments: 'Excellent work',
        },
        {
            id: 4,
            name: 'Bob Brown',
            ticketNumber: '24680',
            ratingGrade: 2,
            examGrade: 4,
            comments: 'Could do better',
        },
        {
            id: 5,
            name: 'Emma Wilson',
            ticketNumber: '13579',
            ratingGrade: 3,
            examGrade: 2,
            comments: 'Average performance',
        },
        {
            id: 6,
            name: 'Michael Johnson',
            ticketNumber: '97531',
            ratingGrade: 4,
            examGrade: 3,
            comments: 'Good job',
        },
        {
            id: 7,
            name: 'Sophia Lee',
            ticketNumber: '80246',
            ratingGrade: 5,
            examGrade: 4,
            comments: 'Exceeds expectations',
        },
        {
            id: 8,
            name: 'David Kim',
            ticketNumber: '68024',
            ratingGrade: 3,
            examGrade: 5,
            comments: 'Top performer',
        },
        {
            id: 9,
            name: 'Olivia Garcia',
            ticketNumber: '41520',
            ratingGrade: 4,
            examGrade: 4,
            comments: 'Well done',
        },
        {
            id: 10,
            name: 'James Rodriguez',
            ticketNumber: '36901',
            ratingGrade: 2,
            examGrade: 3,
            comments: 'Needs improvement',
        },
    ]);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const updatedData = data.map((student) => ({
        ...student,
        finalGrade: (0.6 * student.examGrade + 0.4 * student.ratingGrade).toFixed(2),
        status: (0.6 * student.examGrade + 0.4 * student.ratingGrade) >= 4 ? 'Passed' : 'Failed',
    }));


    const [filters, setFilters] = useState({});
    const [sortedData, setSortedData] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const handleSortByFinalGrade = () => {
        const sorted = [...updatedData].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.finalGrade - b.finalGrade;
            } else {
                return b.finalGrade - a.finalGrade;
            }
        });

        setSortedData(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredData = sortedData.length > 0 ? sortedData.filter((row) =>
        Object.entries(filters).every(([key, value]) => {
            if (key === 'finalGrade' || key === 'status') {
                return row[key].toString().toLowerCase().includes(value.toLowerCase());
            } else {
                return row[key].toString().toLowerCase().includes(value.toLowerCase());
            }
        })
    ) : updatedData.filter((row) =>
        Object.entries(filters).every(([key, value]) => {
            if (key === 'finalGrade' || key === 'status') {
                return row[key].toString().toLowerCase().includes(value.toLowerCase());
            } else {
                return row[key].toString().toLowerCase().includes(value.toLowerCase());
            }
        })
    );

    const calculateStatistics = () => {
        const grades = updatedData.map((student) => {
            const grade = parseFloat(student.finalGrade);
            return grade;
        }).filter((grade) => !isNaN(grade));

        const gradeCounts = {};
        grades.forEach((grade) => {
            gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
        });

        const averageGrade = grades.length > 0 ? grades.reduce((acc, curr) => acc + curr, 0) / grades.length : 0;


        const maxGrade = grades.length > 0 ? Math.max(...grades) : 0;

        const minGrade = grades.length > 0 ? Math.min(...grades) : 0;

        const totalStudents = updatedData.length;

        return {
            gradeCounts,
            averageGrade,
            maxGrade,
            minGrade,
            totalStudents,
        };
    };


    const statistics = calculateStatistics();

    return (
        <>
            <div className="flex flex-row justify-center items-center m-3">
                <button
                    className="px-4 py-2 mr-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSortByFinalGrade}
                >
                    Sort by Final Grade
                </button>
                <button
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleShow}
                >
                    Statitics
                </button>
            </div>

            <div className="m-4 overflow-x-auto overflow-y-auto max-h-[90vh]">
                <div className="flex flex-col">
                    <div className="-my-2 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                {data.length > 0 && (
                                    <>
                                        <div className="flex mb-4">
                                            {Object.keys(data[0]).map((key) => (
                                                <div key={key} className="mr-4">
                                                    <label className="block text-sm font-medium text-gray-700">{key}</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 p-1 border border-gray-300 rounded-md"
                                                        onChange={(e) => handleFilterChange(key, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                            <div className="mr-4">
                                                <label className="block text-sm font-medium text-gray-700">Final Grade</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 p-1 border border-gray-300 rounded-md"
                                                    onChange={(e) => handleFilterChange('finalGrade', e.target.value)}
                                                />
                                            </div>
                                            <div className="mr-4">
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 p-1 border border-gray-300 rounded-md"
                                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    {Object.keys(data[0]).map((key) => (
                                                        <th
                                                            key={key}
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            {key}
                                                        </th>
                                                    ))}
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Final Grade
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredData.map((row, index) => (
                                                    <tr key={index}>
                                                        {Object.keys(row).map((key) => (
                                                            <td key={key} className="px-6 py-4 whitespace-nowrap">
                                                                {row[key]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h2 className="text-lg font-semibold mb-2">Statistics</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <p>Average grade: {statistics.averageGrade.toFixed(2)}</p>
                        <p>Maximal grade: {statistics.maxGrade}</p>
                        <p>Minimal grade: {statistics.minGrade}</p>
                        <p>Total number of students: {statistics.totalStudents}</p>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>

    );
};

export default Tables;
