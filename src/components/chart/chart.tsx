'use client'
import React, {useEffect, useMemo, useRef} from 'react';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import {Ellipsis} from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Colors,
    Filler
);


const config: any = {
    responsive: true,
    maintainAspectRatio: false,
    // animations: {
    //     tension: {
    //         duration: 1000,
    //         easing: 'linear',
    //         from: 1,
    //         to: 0,
    //         loop: true
    //     }
    // },
    transitions: {
        show: {
            animations: {
                x: {
                    from: 0
                },
                y: {
                    from: 0
                }
            }
        },
    },
    plugins: {
        colors: {
            enabled: true,
        },
        tooltip: {
            backgroundColor: "#030229",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 12,
            displayColors: true,
            callbacks: {
                title: () => "",
                label: (context: any) => `${context.parsed.y}%`,
            },
        },
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {display: false},
            border: {display: false},
            ticks: {
                color: "#030229",
                font: {size: 12},
            },
        },
        y: {
            border: {display: false},
            grid: {color: "#faf0f0"},
            ticks: {
                color: "#030229",
                font: {size: 12},
                stepSize: 20,
                callback: (value: number) => `${value}%`,
            },
            min: 0,
            max: 100,
        },
    },

};

const genderChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1000,
        easing: "easeOutBounce",
        animateScale: true,
        animateRotate: true,
    },
    plugins: {
        tooltip: {
            enabled: true,
            backgroundColor: "#030229",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            padding: 10,
            displayColors: true,
            label: (context: any) => {
                const percentage = context.raw;
                console.log(percentage)
                return `${percentage}%`;
            },
        },
        legend: {display: false},
    },
};


export const LineChart = () => {
    const chartRef = useRef<any>(null);
    const data = useMemo(() => {
        const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const values = [52, 55, 35, 78, 45, 35, 65, 70];
        const createGradientBorder = (ctx: CanvasRenderingContext2D, chartArea: any) => {
            if (!chartArea) return "#5BC4FF"; // Default color if chartArea is undefined

            const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
            gradient.addColorStop(0, "#5BC4FF"); // Light Blue
            gradient.addColorStop(1, "#FF5BEF"); // Pink
            return gradient;
        };

        return {
            labels,
            datasets: [
                {
                    label: "Data",
                    data: values,
                    borderColor: (context: any) => {
                        const {chart} = context;
                        if (!chart) return "#ff3b3b"; // Fallback color
                        return createGradientBorder(chart.ctx, chart.chartArea);
                    },
                    tension: 0.4,
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: "rgba(121,119,195,0.2)",
                    pointRadius: 4,
                    pointBackgroundColor: "#605bff",
                },
            ],
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = chartRef.current.chartInstance;

    }, []);


    return (
        <div className="w-full bg-[#f8f8f8] p-4 rounded-lg shadow-[0px_20px_70px_rgba(132,84,204,0.1)]"
             role="region"
             aria-labelledby="audience-history-title"
             aria-describedby="audience-history-description"
        >
            <div className="flex justify-between items-center p-4">
                <h1 className="font-montserrat font-bold text-2xl text-black/70"
                    id="audience-history-title"
                    tabIndex={0}>
                    Audience History
                </h1>
                <button
                    aria-label="More options"
                    onClick={() => console.log('More options clicked')}
                    role="button"
                    tabIndex={0} className="focus:outline-none"
                >
                    <Ellipsis/>
                </button>
            </div>
            <div className="h-[250px]">
                <Line ref={chartRef} data={data} options={config}/>
            </div>
        </div>
    );
};

export const BarChart = () => {
    const data = useMemo(() => ({
        labels: ["Nepal", "Aus", "US", "UK", "India", "Pakistan"],
        datasets: [
            {
                label: "Weekly Performance",
                data: [20, 22, 19, 25, 89, 10],
                backgroundColor: [
                    "#A7A5FF",
                    "#C2E0C6",
                    "#3A3A3A",
                    "#B1D8FF",
                    "#A8B9C9",
                    "#C2E0C6",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderRadius: 10,
                barThickness: 40,
                borderWidth: 1,
            },
        ],
    }), []);

    return (
        <div className="w-full ">
            <div className="flex justify-between items-center p-4">
                <h1 className="font-montserrat font-bold text-2xl text-black/70">
                    View of gigs by brand
                </h1>
            </div>
            <div className="h-[250px] p-2">
                <Bar data={data} options={config}/>
            </div>
        </div>
    );
};
export const GenderChart = () => {
    const chartData = useMemo(() => ({
        labels: ["Female", "Male"],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ["#B458C6", "#4054B2"],
                hoverBackgroundColor: ["#a14eb5", "#35499e"],
                borderWidth: 0,
                cutout: "70%",
            },
        ],
        hoverOffset: 10,
    }), []);

    return (
        <div
            className="flex flex-col items-center justify-center p-4  border-[1px] border-[#D2D5DA] rounded-lg bg-[#D2D5DA] h-full shadow-[0px_20px_70px_rgba(132,84,204,0.1)]"
            role="region"
            aria-labelledby="gender-followed-title"
            aria-describedby="gender-followed-description"
        >
            <h2 id="gender-followed-title" className="text-lg font-semibold text-gray-800" tabIndex={0}>
                Followed by Gender
            </h2>
            <div
                className="relative w-48 h-48 my-4"
                aria-live="polite"
                aria-label="Doughnut chart showing the gender distribution of followers"
            >
                <Doughnut data={chartData} options={genderChartOptions}
                          aria-label="Gender Distribution Doughnut Chart"/>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                    role="presentation"
                >
                    <span className="text-lg font-semibold text-gray-800">Female</span>
                    <span className="text-xl font-bold text-gray-800" aria-live="assertive">
                        70%
                    </span>
                </div>
            </div>

            {/* Custom Legend */}
            <div className="flex gap-4 mt-2 text-sm">
                <div className="flex items-center" role="listitem">
                    <span
                        className="w-3 h-3 bg-[#B458C6] rounded-full mr-1"
                        aria-label="Female, represented by the color pink"
                    ></span>
                    Female
                </div>
                <div className="flex items-center" role="listitem">
                    <span
                        className="w-3 h-3 bg-[#4054B2] rounded-full mr-1"
                        aria-label="Male, represented by the color blue"
                    ></span>
                    Male
                </div>
            </div>
        </div>
    );
};
