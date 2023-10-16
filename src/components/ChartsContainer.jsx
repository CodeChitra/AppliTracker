import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChart from './AreaChartComponent';
import BarChart from './BarChartComponent';
const ChartsContainer = () => {
    const [areaChart, setAreaChart] = useState(true);
    const { monthlyApplications: data } = useSelector(store => store.allJobs);
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type='button' onClick={() => setAreaChart(prev => !prev)}>
                {areaChart ? "Bar Chart" : "Area Chart"}
            </button>
            {areaChart ? <AreaChart data={data} /> : <BarChart data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer
