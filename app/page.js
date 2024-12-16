"use client";

import Image from "next/image";
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import Papa from "papaparse";
import { LoadingSpinner, ChartComponent, TimeChartComponent } from "./data_charts.js"


export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex flex-col space-y-2 p-4 max-w-4xl">
                <h1 className="text-3xl font-bold mb-2">Create Next App</h1>
                <p className="text-lg">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam autem quibusdam, delectus in corrupti, ab impedit magni iure eveniet aliquid soluta neque quisquam ducimus dolores ex suscipit pariatur. Voluptatibus, exercitationem?
                </p>
            </div>
            <ChartComponent 
                loading={<LoadingSpinner />}
            />
            <TimeChartComponent
                loading={<LoadingSpinner />}
            />
        </main>
    );
}