import { request } from "@/utils/axios";
export const getYiQingList = () => {
	return request({
	  url:  'https://api.inews.qq.com//newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
	  method: "post",
	});
}

