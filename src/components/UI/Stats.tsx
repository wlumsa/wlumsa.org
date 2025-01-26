"use client";

import { useEffect, useRef } from "react";
import {
    motion,
    useAnimation,
    useInView,
    useMotionValue,
    useSpring,
    Variant,
} from "framer-motion";

const stats = [
    { value: 2624, label: "Meals Provided" },
    { value: 22147, label: "Charity Raised", prefix: "$" },
    { value: 372, label: "Students Served", suffix:"+" },
   
];

const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
};

const CountingNumber = ({
    value,
    duration = 2,
    prefix = "",
    suffix = "",
}: {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Number(latest.toFixed(0))}${suffix}`;
            }
        });
    }, [springValue, prefix, suffix]);

    return <span ref={ref} />;
};

export function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const itemVariants: { hidden: Variant; visible: Variant } = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="stats">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="text-center space-y-4 py-6 mx-auto">
                    <h2 className="text-[14px] text-primary font-mono font-medium tracking-tight">
                        STATISTICS
                    </h2>
                    <h4 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter">
                        Last year we were able to
                    </h4>
                </div>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stats stats-vertical lg:stats-horizontal shadow"
                    ref={ref}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            animate={controls}
                            variants={itemVariants}
                            custom={index}
                            className="flex flex-col items-center stat"
                        >
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center">
                                <CountingNumber
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </h3>
                            <p className="text-sm text-muted-foreground text-center">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
