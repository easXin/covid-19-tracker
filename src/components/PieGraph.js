import React from 'react'
import { Pie } from 'react-chartjs-2'

function PieGraph() {
    const data = {
        labels: ['Active Cases', 'Recovered', 'Death'],
        datasets: [
            {
                data: [11750537, 169901205, 4013687],
                backgroundColor: [
                    'rgba(221,136,44, 0.7)',
                    'rgba(173,11,57, 0.7)',
                    'rgba(153, 102, 255, 0.7)',

                ],
                borderColor: [
                    'rgba(221,136,44, 1)',
                    'rgba(173,11,57, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    const options = {
        title: {
            display: true,
        }
    }
    return <Pie className="pie" data={data} options={options} />
}

export default PieGraph;
