import React from 'react';
import { assets } from '../../../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TrustMarquee = () => {
    useGSAP(() => {
        const marqueeContent = document.querySelector('.marquee-content');
        const marqueeWidth = marqueeContent.offsetWidth / 2;
        gsap.to(marqueeContent, {
            x: -marqueeWidth,
            repeat: -1,
            duration: marqueeWidth / 100,
            ease: 'linear',
            modifiers: {
                x: (x) => `${parseFloat(x) % marqueeWidth}px`,
            },
        });
    }, []);

    return (
        <section className="w-full flex items-center justify-center">
            <div className="content_area py-16 flex flex-col items-center justify-center gap-6 overflow-hidden">
                <h3 className="text-lg font-semibold">Trusted by over 150+ major companies</h3>

                <div className="marquee w-full overflow-hidden">
                    <div className="marquee-content flex items-center justify-start whitespace-nowrap">
                        <img src={assets.company_01} alt="Company 1" />
                        <img src={assets.company_02} alt="Company 2" />
                        <img src={assets.company_03} alt="Company 3" />
                        <img src={assets.company_04} alt="Company 4" />
                        <img src={assets.company_05} alt="Company 5" />
                        <img src={assets.company_06} alt="Company 6" />
                        <img src={assets.company_01} alt="Company 1" />
                        <img src={assets.company_02} alt="Company 2" />
                        <img src={assets.company_03} alt="Company 3" />
                        <img src={assets.company_04} alt="Company 4" />
                        <img src={assets.company_05} alt="Company 5" />
                        <img src={assets.company_06} alt="Company 6" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustMarquee;