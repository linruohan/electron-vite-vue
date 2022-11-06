<template>
    <div class="box" :style="{ background: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }">
        <div style="color:white" class="box-left">
            <div class="box-left-card">
                <section>
                    <div>较上日+ {{ store.yiqing.chinaAdd.localConfirmH5 }}</div>
                    <div> {{ store.yiqing.chinaTotal.localConfirm }}</div>
                    <div>本土现有确诊</div>
                </section>
                <section>
                    <div>较上日+ {{ store.yiqing.chinaAdd.nowConfirm }}</div>
                    <div> {{ store.yiqing.chinaTotal.nowConfirm }}</div>
                    <div>现有确诊</div>
                </section>
                <section>
                    <div>较上日+ {{ store.yiqing.chinaAdd.confirm }}</div>
                    <div> {{ store.yiqing.chinaTotal.confirm }}</div>
                    <div>累计确诊</div>
                </section>
                <section>
                    <div>较上日+ {{ store.yiqing.chinaAdd.noInfect }}</div>
                    <div> {{ store.yiqing.chinaTotal.noInfect }}</div>
                    <div>无症状感染者</div>
                </section>
                <section>
                    <div>较上日+ {{ store.yiqing.chinaAdd.importedCase }}</div>
                    <div> {{ store.yiqing.chinaTotal.importedCase }}</div>
                    <div>境外输入</div>
                </section>
                <section>
                    <div>较上日+ {{ store.yiqing.chinaAdd.dead }}</div>
                    <div> {{ store.yiqing.chinaTotal.dead }}</div>
                    <div>累计死亡</div>
                </section>
            </div>

            <div class="box-left-pie">
            </div>
            <div class="box-left-line">
            </div>

        </div>
        <div id="china" class="box-center">

        </div>
        <div style="color:white" class="box-right">
            <table class="table" border="1" cellspacing="0">
                <thead>
                    <tr>
                        <th>地区</th>
                        <th>新增确诊</th>
                        <th>累计确诊</th>
                        <th>治愈</th>
                        <th>死亡</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" enter-active-class="animate__animated  animate__flipInY"
                    leave-active-class="">
                    <tr :key="item.name" v-for="(item, index) in store.yiqing.item">
                        <td align="center">{{ item.name }}</td>
                        <td align="center">{{ item.today.confirm }}</td>
                        <td align="center"> {{ item.total.confirm }}</td>
                        <td align="center">{{ item.total.heal }}</td>
                        <td align="center">{{ item.total.dead }}</td>
                    </tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { getYiQingList } from '@/request/api/yiqing/info'
import store from '@/utils/store'
import bg from '/bg.jpg'
import { onMounted } from "vue";
import * as echarts from 'echarts' //echarts 5
import '../../assets/china'
import { geoCoordMap } from "../../assets/geoMap";
import 'animate.css'

const getYiQingInfoList = () => {
    getYiQingList().then(res => {
        console.log("yiqing:", res)
        store.yiqing.list = res.data
        store.yiqing.chinaAdd = store.yiqing.list.diseaseh5Shelf.chinaAdd
        store.yiqing.chinaTotal = store.yiqing.list.diseaseh5Shelf.chinaTotal
        store.yiqing.cityDetail = store.yiqing.list.statisGradeCityDetail.slice(0, 10)
        console.log('store:list', store.yiqing.list)
        console.log('store:chinaAdd', store.yiqing.chinaAdd)
        console.log('store:chinaTotal', store.yiqing.chinaTotal)
        console.log('store:cityDetail', store.yiqing.cityDetail)
        initCharts()
        initPie()
        initLine()
    }).catch((err: Error) => {
        console.log(err);
    })

}

onMounted(
    getYiQingInfoList
)
const initCharts = () => {
    const city = store.yiqing.list.diseaseh5Shelf.areaTree[0].children
    store.yiqing.item = city[1].children
    const data = city.map(v => {
        return {
            name: v.name,
            value: geoCoordMap[v.name].concat(v.total.nowConfirm),
            children: v.children
        }
    })
    const charts = echarts.init(document.querySelector('#china') as HTMLElement)
    // var data = [
    //   {
    //     name: "内蒙古",
    //     itemStyle: {
    //       areaColor: "#56b1da",
    //     },
    //     value: [110.3467, 41.4899]
    //   },
    // ];

    charts.setOption({
        // backgroundColor: "black",
        geo: {
            map: "china",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"],
            layoutSize: "120%",
            itemStyle: {
                // normal: {
                areaColor: {
                    type: "linear-gradient",
                    x: 0,
                    y: 1200,
                    x2: 1000,
                    y2: 0,
                    colorStops: [
                        {
                            offset: 0,
                            color: "#152E6E", // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: "#0673AD", // 50% 处的颜色
                        },
                    ],
                    global: true, // 缺省为 false
                },
                shadowColor: "#0f5d9d",
                shadowOffsetX: 0,
                shadowOffsetY: 15,
                opacity: 0.5,
                // },

            },
            emphasis: {
                areaColor: "#0f5d9d",
            },
            regions: [
                {
                    name: "南海诸岛",
                    itemStyle: {
                        areaColor: "rgba(0, 10, 52, 1)",
                        borderColor: "rgba(0, 10, 52, 1)",
                        // normal: {
                        opacity: 0,
                        label: {
                            show: false,
                            color: "#009cc9",
                        },
                        // },
                    },
                    label: {
                        show: false,
                        color: "#FFFFFF",
                        fontSize: 12,
                    },
                },
            ],
        },
        series: [
            {
                type: "map",
                // selectedMode: "multiple", //多选
                map: "china",
                aspectScale: 0.8,
                layoutCenter: ["50%", "50%"], //地图位置
                layoutSize: "120%",
                zoom: 1, //当前视角的缩放比例
                // roam: true, //是否开启平游或缩放
                scaleLimit: {
                    //滚轮缩放的极限控制
                    min: 1,
                    max: 2,
                },
                label: {
                    show: true,
                    color: "#FFFFFF",
                    fontSize: 12,
                },
                itemStyle: {
                    // normal: {
                    areaColor: "#0c3653",
                    borderColor: "#1cccff",
                    borderWidth: 1.8,
                    // },

                },
                emphasis: {
                    areaColor: "#56b1da",
                    label: {
                        show: true,
                        color: "#fff",
                    },
                },
                data: data,
            },
            {
                // name: 'Top 5',
                type: 'scatter',
                coordinateSystem: 'geo',
                //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
                // symbolSize: [30,120],
                // symbolOffset:[0, '-40%'] ,
                symbol: 'pin',
                symbolSize: [45, 45],
                label: {
                    // normal: {
                    show: true,
                    color: '#fff',
                    formater(value: any) {
                        return value.data.value[2]
                    }
                    // }
                },
                itemStyle: {
                    // normal: {
                    color: '#1E90EF', //标志颜色
                    // }
                },
                data: data,
            },
        ],
    })
    charts.on('click', (e: any) => {
        console.log(e);
        store.yiqing.item = e.data.children
    })
}

const initPie = () => {
    const pies = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
    pies.setOption({
        backgroundColor: "#223651",
        tooltip: {
            trigger: 'item'
        },

        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '15',
                    }
                },

                data: store.yiqing.cityDetail.map(v => {
                    return {
                        name: v.city,
                        value: v.nowConfirm
                    }
                })
            }
        ]
    })



}

const initLine = () => {
    const lines = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
    lines.setOption({
        backgroundColor: "#223651",
        xAxis: {
            type: 'category',
            data: store.yiqing.cityDetail.map(v => v.city),
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        tooltip: {
            trigger: "axis"
        },
        label: {
            show: true
        },
        series: [
            {
                data: store.yiqing.cityDetail.map(v => v.nowConfirm),
                type: 'line',
                smooth: true
            }
        ]
    })
}

</script>
  
<style lang="less">
@itemColor: #41B0db;
@itemBg: #223651;
@itemBorder: #212028;

.table {
    width: 100%;
    background: #212028;

    tr {
        th {
            padding: 5px;
            white-space: nowrap;
        }

        td {
            padding: 5px 5px;
            width: 100px;
            white-space: nowrap;
        }
    }
}

* {
    padding: 0;
    margin: 0;
}

html,
body,
#app {
    height: 100%;
    overflow: hidden;
}


.box {
    height: 100%;
    display: flex;
    overflow: hidden;
    background-image: url('../../assets/bg.jpg');
    background-repeat: no-repeat;
    background: size 100%;

    &-left {
        width: 400px;

        &-pie {
            height: 300px;
            margin-top: 20px;
        }

        &-line {
            height: 320px;
            margin-top: 20px;

        }

        &-card {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-template-rows: auto, auto;

            section {
                background: @itemBg;
                border: 1px solid @itemBorder;
                padding: 6px;
                display: flex;
                flex-direction: column;
                align-items: center;

                div:nth-child(2) {
                    color: @itemColor;
                    padding: 8px;
                    font-size: 12px;
                    font-weight: bold;
                }
            }
        }
    }

    &-center {
        flex: 1;
    }

    &-right {
        width: 400px;
    }
}
</style>