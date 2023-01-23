![header](https://capsule-render.vercel.app/api?type=cylinder&color=faebd7&height=300&section=header&text=LeChou&fontSize=90)


### Product Manager : 류건호(B) Project Manmager : 권나현(F)
### Teammates
- 김진우(F)
- 정다경(F)
- 조윤환(F)
- 권태령(B)
---
### 👁 프로젝트 리뷰
- 오설록 클론 프로젝트
- 오설록의 기본 디자인은 가져가되, 저희가 직접 기획안을 구상하여 새로운 사이트를 만들었습니다.
- 저희 Le chou는 세 가지 문제: 처음 채식을 시도하는 사람들의 접근성이 제한되는 문제, 채식주의자들의 선택 제한, 그리고 환경보호에 가치를 두는 소비자들의 선택지를 늘려주기 위한 해답을 개발에서 찾았습니다.
- 짧은 프로젝트 기간동안 두번의 스프린트 미팅을 가지면서, 해결하고자하는 문제점들을 개발을 중심으로 프로젝트를 진행하였습니다.
- 개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.
---
### 👩‍👩‍👧‍👧 개발 인원 및 기간

- 개발기간 : 2023/01/02 ~ 2023/01/13
- 개발 인원 : 프론트엔드 4명, 백엔드 2명
---

### ？ 프로젝트 선정이유
현재 국내 채식 상품 시장에서 고급화 전략을 내세운 곳은 없습니다. 채식주의자들을 위한 웹서비스를 살펴봐도 UI/UX가 과거의 산물인 경우가 많았습니다. 
또한 상세한 영양소를 깔끔한 UI로 정리 해놓은 웹사이트가 없었습니다. 저희 돼지테리안 팀은 그점에 유의해 채식을 했을때의 장점인 지구 온난화의 주 원인인 이산화탄소, 
매탄가스를 감소 시킨다는 점을 강조 해 환경을 생각하는 사람들과, 채식을 원하는 모든 고객들, 
채식을 처음 시도 해 보려는 고객들을 타겟층으로 삼아 한눈에 보이는 깔끔한 상품 UI와 영양소 정보를 제공 해 충성고객을 확보하면 좋겠다 생각해 프로젝트를 시작하게 되었습니다.

---

### ⚒ 사용한 기술 스택
<div>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=GIT&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-F05032?style=flat&logo=GitHub&logoColor=white"/>
</div>

## 구현 기능 (FE)

#### 로그인 페이지

- 이메일 아이디와 비밀번호의 프론트엔드와 같은 형식의 정규식 테스트를 배치 및 비밀번호를 bcrypt 를 이용하여 암호화하여 저장.
- TYPEORM에 있는 transcation을 이용하여 모든 정보가 데이터베이스에 저장될 수 있도록 보장함 에러가 발생할 경우 rollback을 통해 데이터베이스에 정확하지 않은 데이터가 저장되는 것을 방지
- 로그인에 성공할 시 JWT 토큰을 발급. payload 값으로는 유저의 아이디를 저장.
        
#### 메인페이지

- 베스트 상품을 위한 api를 통해 가장 많이 팔린 상품을 데이터화하여 전달.
- 또 언급될 QueryBuilder를 통해서 프론트에서 유동적으로 원하는 API를 호출 할 수 있게 함.

#### 상품페이지

- QueryBuilder를 customise 하여 raw query를 한번 쓰는 것으로 모든 요청을 dynamic하게 처리하는 것을 가능케 함. 더 상세 하게는 카테고리 별, 새로운 상품 순, 또 여러가지 카테고리를 엮어서 데이터 화하여 주는것을 가능케 함.

#### 결제페이지

- 카트에 담은 상품을 유저 별로 볼 수 있게 하고 상품에 따른 CRUD operation을 구현.
