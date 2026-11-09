// src/data/photography-data.ts
// 自动由本地素材生成，ID 全局唯一，零重复

export interface PhotoProject {
  id: string;
  title: string;
  group: "personal" | "tws";
  folder: string;
  photos: string[];
}

export interface FilmPhotoCard {
  projectId: string;
  projectTitle: string;
  group: "personal" | "tws";
  coverSrc: string;
  photoIndex: number;
}

export const photoProjects: PhotoProject[] = [
  {
    "id": "personal-photography",
    "title": "个人摄影",
    "group": "personal",
    "folder": "个人摄影",
    "photos": [
      "/images/photography/个人摄影/639533867_18572541889041116_8597442528450249826_n.jpg",
      "/images/photography/个人摄影/655515328_18097506532800819_1568322806344017683_n.jpg",
      "/images/photography/个人摄影/656443631_18118323805628641_3241371329767136094_n.jpg",
      "/images/photography/个人摄影/660861708_18453472783111861_5506469119084013989_n.jpg",
      "/images/photography/个人摄影/661867137_18384898600095170_5980133639648225056_n.jpg",
      "/images/photography/个人摄影/C3LOhuMJLiP.jpg",
      "/images/photography/个人摄影/zzh.editor-photo-C3NODe8rOM--20240211_200505_624798165.jpg",
      "/images/photography/个人摄影/zzh.editor-photo-C3NOFXCL-LC-20240211_200520_624915845.jpg",
      "/images/photography/个人摄影/zzh.editor-photo-C8UaXHtJBsd-20240617_214417_622903080.jpg",
      "/images/photography/个人摄影/zzh.editor-photo-CwFshqCviae-20230818_221740_623929650.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_180043_161.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_180108_688.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_180252_443.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_183018_286.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_183027_496.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_184025_954.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_184040_354.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_184058_567.jpg",
      "/images/photography/个人摄影/微信图片_2026-11-07_184102_712.jpg"
    ]
  },
  {
    "id": "tws-22-portrait",
    "title": "22 年全系产品结合人像拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/22 年全系产品结合人像拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09255.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09258.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09266.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09279.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09281.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09285.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09289.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09293.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09294.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09297.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/DSC09304.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4506.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4526.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4530.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4546.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4952.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4957.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4959.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4979.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_4984.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5025.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5051.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5053.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5057.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5096.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5098.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5118.jpg",
      "/images/photography/TodayWellSpent拍摄案例/22%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/SU3_5170.jpg"
    ]
  },
  {
    "id": "tws-23-portrait",
    "title": "23 年全系产品结合人像拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/23 年全系产品结合人像拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/0E6C441C-4FD0-4261-A155-0C74E4994077.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/1A6DEDCF-22FA-40F4-995A-B1BADBDE5FB4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/1B11C09A-CB7F-4B24-80C2-968C555B6E5D.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/25B9C402-17E3-4BCA-8812-A04B2E412E93.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/2941DB48-4E20-4330-BBA8-807EF4599099.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/2CE69EAE-FEF5-474C-AFEE-D11F0E69ECDF.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/59F8E460-72B3-4872-A09A-A27854961ABA.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/5B1A1391-825E-4B13-ADC5-BCC5CF284AE9.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/66A6E5EC-23B5-48DF-885E-393F54B81D83.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/69FEFC9A-EBEC-4FFF-A9D0-0155FD5B3CDC.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/6B49FA8F-AD62-4C3F-A045-3898C89E54A8.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/81D92AA8-72F6-4174-A3A8-72E8A27BC41B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/837F9CA4-6126-4060-8972-B9725BE90BA4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/85C8DCD4-64B3-425C-992B-C96D34779143.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/86E0A4F7-7297-4491-BD64-9FF642FE688D.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/8A864F48-3F29-4BEA-8347-9C147C5E57BB.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/8FF634ED-A342-473A-8E48-0AA36A20A4C4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/9C60EB34-7420-436A-B05D-0CBF62F997E4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/AD05DD0D-DD21-4A92-8EBF-AA0AF1ED3480.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/B692B181-E347-417C-8B1E-4D280B6EA2B6.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/E6B8BA2E-702D-4427-8DA6-97C78738974A.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/EE1C4EF6-124C-47AC-A69D-9307E0FC33B0.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/F0E1BC61-B013-4B00-941C-5999F1DA98DB.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%85%A8%E7%B3%BB%E4%BA%A7%E5%93%81%E7%BB%93%E5%90%88%E4%BA%BA%E5%83%8F%E6%8B%8D%E6%91%84/F357322B-4200-43D0-9A3E-44FBF91D833A.jpg"
    ]
  },
  {
    "id": "tws-23-xmas",
    "title": "23 年圣诞 Campaign 拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/23 年圣诞 Campaign 拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/0903B605-AF8F-492F-8251-3ED9BC78E07D.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/6C078A6F-6FD8-4701-A947-8E6B33BEB6B9.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/6EE73B51-BABC-4FC0-A265-215903545111.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/A0846EF1-AF52-42A4-AC73-84131D5F1380.jpg",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/IMG_4033.JPG",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/IMG_4036.JPG",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/IMG_4064.JPG",
      "/images/photography/TodayWellSpent拍摄案例/23%20%E5%B9%B4%E5%9C%A3%E8%AF%9E%20Campaign%20%E6%8B%8D%E6%91%84/IMG_4067.JPG"
    ]
  },
  {
    "id": "tws-lamy",
    "title": "Lamy联名笔拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/Lamy联名笔拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/0F237E0F-1B6F-4797-B41D-379EC1964A30.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/2F7AEFEB-23E7-4C21-AF03-15AA0A0A9140.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/3118B63D-8C0E-48E9-BCAF-34D45D69C8B9.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/3D6BC8DE-763A-4C4D-B4A7-24BD5F6F80BB.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/47F1FB51-15C0-40D8-81A5-293BACB8E3DE.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/51F88149-4413-44C3-9139-6C10D7EC7A5A.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/5509E513-1FF7-4511-89AC-2E4142502880.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/5A7C12BC-4747-4BA5-A883-7B8D3B5E1D3B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/694DA686-9BA2-4A32-A1D4-CDAFBF30B701.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/8EB14068-4212-4CBB-900D-9226ECFADD97.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/ABC8EDC4-E7B4-4347-9CD6-CAA1A7EE9B8B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/B044BE6A-1205-4E52-8356-95C3FE16FA24.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/B3034223-63C8-4EA4-AC73-B7568319E33C.jpg",
      "/images/photography/TodayWellSpent拍摄案例/Lamy%E8%81%94%E5%90%8D%E7%AC%94%E6%8B%8D%E6%91%84/DAF9ACB2-17B3-4626-BFF4-5F3C187656EC.jpg"
    ]
  },
  {
    "id": "tws-water-cup",
    "title": "好好喝水杯拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/好好喝水杯拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03617.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03620.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03642.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03645.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03651.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03654.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E5%96%9D%E6%B0%B4%E6%9D%AF%E6%8B%8D%E6%91%84/DSC03655.jpg"
    ]
  },
  {
    "id": "tws-handbook",
    "title": "好好生活手册拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/好好生活手册拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03552.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03564.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03565.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03570.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03571.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03582.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03600.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03606.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%94%9F%E6%B4%BB%E6%89%8B%E5%86%8C%E6%8B%8D%E6%91%84/DSC03610.jpg"
    ]
  },
  {
    "id": "tws-oil",
    "title": "好好睡精油",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/好好睡精油",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/4C561920-1A30-4813-A499-3797561D744A.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00156.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00285.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00288%202.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00288.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00290%202.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00290.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00292%20copy%20(1).jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00292%20copy%202.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00292%20copy.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00299.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00302.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00303.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00305%202.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/DSC00305.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/FAE67DEC-2BE8-4D03-A700-5F89AA798E50.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/IMG_6353.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/IMG_9460.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/%E7%B2%BE%E6%B2%B90073.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/%E7%B2%BE%E6%B2%B90099.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/%E7%B2%BE%E6%B2%B90117.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E5%A5%BD%E5%A5%BD%E7%9D%A1%E7%B2%BE%E6%B2%B9/%E7%B2%BE%E6%B2%B90118.jpg"
    ]
  },
  {
    "id": "tws-event",
    "title": "活动拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/活动拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/00C8EB32-02E2-4B70-B719-E22CA642C86A.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/072CD1A3-4268-4ABC-8A1D-8826CE3D5AAD.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/0F504042-C5EA-4385-9BC4-9E837582EACA.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/117283AD-8AB4-4CC4-9D1C-09575E4B50A7.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/1586FF67-D0CF-4E3E-A70A-7A368E690A56.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/15DD70FE-5F38-48DA-8297-9226AFB0B752.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/1C76AD9F-B97D-4BDA-9F93-5EEF609D79B6.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/1FD6B63B-FF43-4F6F-8CF9-F8EB05E9FDF5.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/29FE85AD-E22D-4336-9520-828646BE633F.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/481E788D-A5CA-4CFC-B9E5-A0A566B84EDF.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/657F40AF-8B6E-468E-9DD5-41F3ECAF1DAD.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/6B9BD7BF-6F40-4D76-A418-B7B9D7F1C32B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/75EFBDDD-890F-4782-8DB2-9B4AD7BCF714.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/767F7C82-93F8-477D-B31B-027DF66906A8.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/76A3CE4A-496F-43B3-AFFB-860A505B55AF.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/8CACEAD8-D7E7-4FF3-93D7-38323026F431.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/AA2A96F6-CFB4-4816-A29D-467A20FB978F.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/AA7938C0-9F35-4513-A868-95019D0C7C08.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/BF0B70D6-39CE-444B-B30E-E68314D7A44B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/C0515B1D-FA61-4C5C-B166-D5DB5BB790E6.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/C05D53E0-4329-440E-BC33-A4E48BD1E70D.JPG",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/CCEACEF6-A869-412A-936E-8393765D707A.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC00046.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC00051.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC03659.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC03661.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC03803.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC04166.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC04233.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC04307.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/DSC04338.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/E0286920-66EA-4B40-B298-941A98A89674.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/EDD71810-17F2-4F81-AF95-BD7AE3A354F2.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E6%B4%BB%E5%8A%A8%E6%8B%8D%E6%91%84/FAFA4EFC-E796-41F8-BAF3-8DA35884AEF1.jpg"
    ]
  },
  {
    "id": "tws-social",
    "title": "社交媒体用途日常拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/社交媒体用途日常拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/10AC8107-8B2E-412D-9900-7692241B9D23.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/25B9B615-1F1F-4CD7-90C6-0BAE64CA6DCE.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/4D5D30EC-8D21-4DB3-822F-3CA46838F1DC.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/5E27711E-E698-4F4C-A9CC-184D578CC098.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/83065EE7-B8C9-453D-9327-9651141DDFA0.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/83FF877E-9343-46A2-82DC-968B98B9BE1F.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/AE78E23A-989C-4DCC-9D99-B685CC12EEA4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/BD5965B4-7D4C-4E78-81B4-FFF70A9A8215.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/C2B489CA-9ED2-438B-BF37-BD5BED8B43E5.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/CAC9C78C-4526-4831-BBC5-3799212D6103.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/D2DB7E20-22F4-4853-B13C-04F0D7EF29FC.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/D6450A15-8DC7-423F-AB4D-087C945D9BD4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DE63B828-5377-427C-9EE8-862E2BD27B36.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04780.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04781.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04792.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04802.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04833.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04843.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04856.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E7%A4%BE%E4%BA%A4%E5%AA%92%E4%BD%93%E7%94%A8%E9%80%94%E6%97%A5%E5%B8%B8%E6%8B%8D%E6%91%84/DSC04859.jpg"
    ]
  },
  {
    "id": "tws-sketchbook",
    "title": "速写本拍摄",
    "group": "tws",
    "folder": "TodayWellSpent拍摄案例/速写本拍摄",
    "photos": [
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/00568C71-4063-4136-8BD6-C654A229FFA4.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/23697586-83AC-4D77-8B7D-AA70EB77ED68.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/4F4650F1-1007-4CE1-ACD5-38119FE2E232.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/5110457B-51F1-4826-97B5-1D2707689D7B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/576A6BE5-C177-4E71-A9D4-39056CEE8291.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/5BB9810F-A529-4D91-A34B-6E706401B2EF.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/5E54D52E-2A72-4E4B-922A-3791C68F6823.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/5F791C85-BCA7-4F27-8E30-0765FEB4EC71.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/5FE1AF08-0C72-4ACF-9CC9-115F20D92BC2.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/687AEA0A-CB74-4FBE-8C32-925E3EDD81CE.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/6D5D33DF-6931-474F-8603-88143046BF5C.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/71A88283-C153-4781-A0DD-6FFB6060B7E9.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/77DE987F-4E1B-40A8-8F8C-049DC5E5EE4A.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/7D703B66-6D6C-41E3-931B-577CF4320890.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/86A724FF-A432-4E92-9153-F3263FF3F0FB.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/8B41A1F9-72D2-4821-851E-5242F839672C.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/8D2BA03B-4AB3-427C-975B-1B868A8F12D3.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/939EEBF1-00D2-45AF-B310-547C68C9CB01.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/97CAE6F8-0796-49EA-8896-FFA3C595CDD7.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/A3EC45C5-3B4D-45F4-97D0-83100EBD8905.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/B503588D-B9F2-46CE-868D-42D180DF5E3B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/B526B9F4-0C56-4A21-B618-5FF90CEDB963.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/DSC05334.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/DSC05344.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/DSC05345.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/DSC05346.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/EB228F07-6CA6-4F7F-B17B-79EA8A33858B.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/ED9A76D0-0FCD-413C-84E0-016F11281994.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/FB3980C6-AA84-4198-B9D0-812711D52C38.jpg",
      "/images/photography/TodayWellSpent拍摄案例/%E9%80%9F%E5%86%99%E6%9C%AC%E6%8B%8D%E6%91%84/FF194906-0183-4131-B917-AD2ACF192CCD.jpg"
    ]
  }
];

/**
 * 确定性的默认 6 张照片（用于服务端 SSR 与初次水合，确保 HTML 字符与客户端完全吻合）
 */
export const DEFAULT_SIX_PHOTOS: FilmPhotoCard[] = photoProjects.slice(0, 6).map((proj) => ({
  projectId: proj.id,
  projectTitle: proj.title,
  group: proj.group,
  coverSrc: proj.photos[0] || "",
  photoIndex: 0,
}));

/**
 * 每次进入页面随机挑选 6 个项目各 1 张代表作，构成 6 张轮播卡片
 */
export function getRandomSixPhotos(): FilmPhotoCard[] {
  const shuffledProjects = [...photoProjects].sort(() => 0.5 - Math.random());
  const selected = shuffledProjects.slice(0, 6);

  return selected.map((proj) => {
    const randomIndex = Math.floor(Math.random() * proj.photos.length);
    return {
      projectId: proj.id,
      projectTitle: proj.title,
      group: proj.group,
      coverSrc: proj.photos[randomIndex],
      photoIndex: randomIndex,
    };
  });
}
