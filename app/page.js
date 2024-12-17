"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from "papaparse";
import { LoadingSpinner, ChartComponent, TimeChartComponent } from "./data_charts.js";
import { NavBar } from "./nav.js";

function LandingPage() {
    useEffect(() => {
        const canvas = document.getElementById("animated-bg");
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const numParticles = 60;

        // Created with Claude 3.5 sonnet
        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 0.5 + Math.random(),
                angle: Math.random() * Math.PI * 2,
                size: 2 + Math.random() * 2
            });
        }

        const render = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0066cc';
            particles.forEach(particle => {
                // Update position
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Connect nearby particles
                particles.forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(255, 102, 102, ${1 - distance / 100})`;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
                
                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            });
            
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-screen">
            <canvas
                id="animated-bg"
                className="absolute inset-0 w-full h-full"
            ></canvas>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-black text-center">
                    Game-changer: How do the major sports events influence
                    YouTube engagement?
                </h1>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <>
        <NavBar />
        <LandingPage />
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex flex-col space-y-2 p-4 max-w-4xl">
                <h1 className="text-3xl font-bold mb-2">Create Next App</h1>
                <p className="text-lg">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam autem quibusdam, delectus in corrupti, ab impedit magni iure eveniet aliquid soluta neque quisquam ducimus dolores ex suscipit pariatur. Voluptatibus, exercitationem?
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repellat iure tenetur similique nemo soluta velit voluptate. Tempore esse adipisci quia repellat amet eaque numquam deleniti asperiores dolore? Voluptates, possimus?
                    Suscipit fuga laudantium beatae vel esse non, consectetur dolores praesentium eos tempora? Perferendis eius accusantium tenetur sit error natus, corporis voluptas, beatae sed ipsa repudiandae qui nobis autem voluptatum quod?
                    Soluta sequi deleniti et a, expedita nesciunt quos ad, facere laudantium nisi numquam perferendis? Veritatis eum harum saepe quae itaque maxime quia, assumenda vero commodi iste dolores corporis dolorum sequi.
                    Placeat numquam nostrum sit, ipsam id delectus voluptatum inventore quas nemo ex. Dolor, ea dolore voluptate soluta nobis rerum nostrum nesciunt iusto magnam maxime id aperiam ipsum velit cum? Eaque!
                    Alias, magnam sunt vitae facilis consectetur aut, et, quae odio eveniet accusantium deleniti exercitationem laudantium iste tempore? Sapiente incidunt impedit vel debitis ab in tenetur beatae dolorem, nulla laborum ipsum.
                    Nihil quisquam odio quia veniam nemo voluptatibus animi! Sit labore eius voluptatem hic fugit eum itaque tempora, veniam ipsam at saepe numquam quis error perferendis eos, repellat ex harum excepturi.
                    Quae natus maxime ex eligendi odit molestias explicabo voluptatibus atque! Quis officiis quam, exercitationem blanditiis, dicta alias voluptates accusamus voluptatibus, fugit iste dolorem! Numquam excepturi quia maxime illo ea minus?
                    Tempora eveniet similique non perferendis repudiandae neque commodi aspernatur est totam nobis dolor, delectus incidunt repellendus tenetur facilis et quam, dicta corrupti quas iusto vitae quisquam illum saepe! Molestiae, reiciendis.
                    Possimus quas voluptates, tempora iusto ab perspiciatis atque amet explicabo enim laborum! Alias accusamus, veniam voluptatum sed inventore cupiditate? Reiciendis temporibus veniam autem, quo illum possimus magni blanditiis et fugiat.
                    Quae, voluptates fugit? Excepturi, quos. Accusamus numquam excepturi magnam libero porro eaque quas commodi, dolore facere ipsum aliquid saepe quibusdam. Ipsa deleniti, aperiam assumenda veniam iste cum sapiente voluptatem veritatis.
                </p>
            </div>
            <ChartComponent 
                loading={<LoadingSpinner />}
            />
            <TimeChartComponent
                loading={<LoadingSpinner />}
            />
        </main>
        </>
    );
}
