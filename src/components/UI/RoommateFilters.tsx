'use client';

import React, { useState, useEffect } from 'react';

interface FilterProps {
}

const RoommateFilter: React.FC<FilterProps> = () => {
    const [gender, setGender] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [costOfLiving, setCostOfLiving] = useState('');   

    
    return (
        <div className="flex gap-4 p-4 border rounded-md shadow-md mb-4">
            {/* Gender Filter */}
            <div>
                <label htmlFor="gender" className="block font-medium">Gender</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">All</option>
                    <option value="sister">Sisters</option>
                    <option value="brother">Brothers</option>
                </select>
            </div>

            {/* Property Type Filter */}
            <div>
                <label htmlFor="propertyType" className="block font-medium">Property Type</label>
                <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">All</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                </select>
            </div>
            <div>
                <label htmlFor="costOfLiving" className="block font-medium">Cost of Living</label>
                <select
                    id="costOfLiving"
                    value={costOfLiving}
                    onChange={(e) => setCostOfLiving(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">All</option>

                    <option value="">$800 and lower</option>
                    <option value="">$800 - $1000 </option>
                    <option value="">$1000 - $1500 </option>
                    <option value="">1500+</option>
                </select>
            </div>
        </div>
    );
};

export default RoommateFilter;
