import React, { useEffect, useContext } from 'react';
import RegionContext from '../../createContext';
import * as echarts from 'echarts';

export default function YearlyDisplay() {

    const dataForYear = useContext(RegionContext)
    function slice_dict(dict, start, end) {
        // 用于获取当前字典的key
        const key_list = []
        // 用于存储月份的value
        const newDict = []
        for (const i in dict) {
            key_list.push(i)
        }
        // 获取到月份的key
        const se_list = key_list.slice(start, end)
        for (let i = 0; i < se_list.length; i++) {
            // 将月份的value存到新建的newDict里面
            newDict.push(dict[se_list[i]])
        }
        return newDict
    }

    useEffect(() => {
        if (!dataForYear) return;
        // 声明一个数组，用于接收字典里面的key，key就是月份，total_annaul这些
        const keys = []
        for (let i in dataForYear[1]) {
            keys.push(i)
        }

        const offences = new Set()
        // 获取到所有种类的offence
        for (let i = 0; i < dataForYear.length; i++) {
            offences.add(dataForYear[i]['offence'])
        }

        const details = {}
        for (let i = 0; i < dataForYear.length; i++) {
            details[dataForYear[i]['offence']] = slice_dict(dataForYear[i], 5, 17)
        }

        // 封装一个series列表，就不需要一个一个的添加series
        let series = []
        offences.forEach(element => {
            series.push({
                name: element,
                type: 'line',
                stack: '总量',
                smooth: true,
                data: details[element]
            })
        });

        // 如果有几个图需要显示，这里的id就不能一样
        const chartDom = document.getElementById('yearly_display');
        const myChart = echarts.init(chartDom);
        let option;
        option = {
            title: {
                text: dataForYear[0]['locality'] + ': By Month'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: keys.slice(5, 17)
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series
        };
        option && myChart.setOption(option);
    }, [dataForYear])

    return (
        <div id="yearly_display" style={{ width: 1000, height: 400 }}></div>
    );
}

