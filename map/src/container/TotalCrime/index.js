// import React, { useEffect, useState } from 'react';

// import * as echarts from 'echarts';
// import axios from 'axios';

// export default function TotalCrime() {

//     const [data, setData] = useState(null)

//     useEffect(() => {
//         if (data) return;
//         const fetchData = async () => {
//             const results = await axios.get('api/crime/2018-19',);
//             setData(results.data);
//         };
//         fetchData();
//     });


//     useEffect(() => {
//         if (!data) return;
       
//         // 封装一个series列表，就不需要一个一个的添加series
//         let series = []
        

//         // 如果有几个图需要显示，这里的id就不能一样
//         const chartDom = document.getElementById('total');
//         const myChart = echarts.init(chartDom);
//         let option;
//         option = {
//             title: {
//                 text: data[0]['locality']
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//                 }
//             },
//             // legend: {
//             //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
//             // },
//             grid: {
//                 left: '3%',
//                 right: '4%',
//                 bottom: '3%',
//                 containLabel: true
//             },
//             xAxis: [
//                 {
//                     type: 'category',
//                     // data: keys.slice(5, 17)
//                 }
//             ],
//             yAxis: [
//                 {
//                     type: 'value'
//                 }
//             ],
//             series
                

//         };
//         option && myChart.setOption(option);
//     }, [data])

//     return (
//         <div id="total" style={{ width: 1400, height: 400 }}></div>
//     );
// }

