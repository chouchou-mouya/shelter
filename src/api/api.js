import http from "@/api/http.js";
import base from "@/api/base.js";

const basic = {
  getAnimalData({ animal_kind, page, $top, animal_update, animal_area_pkid, animal_sex }= {}) {
    /**
     * @param
     * animal_area_pkid 動物所屬縣市代碼(請對照縣市代碼表)
     * animal_shelter_pkid 動物所屬收容所代碼
     * animal_kind 動物的類型[貓 | 狗 | 鳥 ...]
     * animal_sex 動物性別 [M | F | N](公、母、未輸入)
     * animal_age 動物年紀 [CHILD | ADULT](幼年、成年)
     * animal_bodytype 動物體型 [SMALL | MEDIUM | BIG](小型、中型、大型)
     * animal_status 動物狀態 NONE | OPEN | ADOPTED | OTHER | DEAD](未公告、開放認養、已認養、其他、死亡)
     * animal_createtime 動物資料建立時間
     * Page
     * top
     * animal_update 動物資料異動時間
     * https://data.gov.tw/dataset/85903
     */
    return http.get(`${base.api}animal_list`, {
      params: {
        animal_kind, page, $top, animal_update, animal_area_pkid, animal_sex
      }
    })
  },
}




export default {
  basic,
};
