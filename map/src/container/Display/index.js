import React, { useEffect, useState, useContext } from 'react';
import * as echarts from 'echarts';
import RegionContext from '../../createContext';
import YearlyDisplay from '../YearlyDisplay'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'

export default function Display() {
    // 下拉菜单的选项
    const [yearOptions, setYearOptions] = useState([])
    // 下拉菜单选中的数据
    const [select, setSelect] = useState('2020-21')
    // 设置和获取到：根据年份和地区拿到的数据
    const [dataForYear, setDataForYear] = useState(null)

    // 用于接收父组件传递过来的数据
    const data = useContext(RegionContext)
    // 设置默认显示2020-21财年的数据，当点击地图上的区域的时候，会刷新一次
    useEffect(() => {
        const fetchData = async () => {
            const results = await axios.get('api/crime/' + data[0]['locality'] + '/2020-21/');
            setDataForYear(results.data);
            // 在选取了年份之后，如果不重置一下select，那么在点击地图渲染之后
            // select就不会是默认的2020-21，所以需要重置
            setSelect('2020-21')
        };
        fetchData();
    }, [data])

    useEffect(() => {
        if (data == null) return;
        const x_Axis = [
            '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16',
            '2016-17', '2017-18', '2018-19', '2019-20', '2020-21'
        ]
        // 用字典去除重复的
        const offences = new Set()
        const details = {}

        // 为下拉菜单封装关于财年的选项
        setYearOptions(x_Axis)

        // 获取到所有种类的offence
        data.map(item => {
            return offences.add(item['offence'])
        })

        offences.forEach(item => {
            const newList = []
            data.map(element => {
                if (item === element['offence']) {
                    newList.push(element['total_annual'])
                }
                return details[item] = newList
            })
        })

        // 封装一个series列表，就不需要一个一个的添加series
        let series = []
        offences.forEach(element => {
            series.push({
                name: element,
                type: 'bar',
                stack: '总量',
                data: details[element]
            })
        });
        const chartDom = document.getElementById('display');
        const myChart = echarts.init(chartDom);
        let option;
        option = {
            title: {
                text: data[0]['locality'] + ': By Year'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            xAxis: {
                type: 'category',
                data: x_Axis
            },
            yAxis: {
                type: 'value'
            },

            series
        };
        option && myChart.setOption(option);
    }, [data])

    const get_yearly_data = (year) => {
        const fetchData = async () => {
            const results = await axios.get(`api/crime/${data[0]['locality']}/${year}/`);
            setDataForYear(results.data);
        };
        fetchData();
    }

    return (
        <div>
            <Dropdown button text={select}>
                <Dropdown.Menu children>
                    {
                        yearOptions.map(item => {
                            return <Dropdown.Item key={item}
                                onClick={() => { setSelect(item); get_yearly_data(item) }}
                            >
                                {item}
                            </Dropdown.Item>
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
            <div id="display" style={{ width: 1000, height: 400 }}></div>
            <RegionContext.Provider value={dataForYear}>
                <YearlyDisplay />
            </RegionContext.Provider>
        </div>
    );
}

