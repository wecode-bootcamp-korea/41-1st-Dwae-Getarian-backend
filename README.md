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

### 구현 영상

https://www.youtube.com/watch?v=sMrCeZQWSXc

### 구현 기능 (BE)

#### 로그인 페이지
- 회원가입
  -	이메일 아이디와 비밀번호의 프론트엔드와 같은 형식의 정규식 테스트를 배치
  -	비밀번호를 bcrypt 패키지를 이용하여 암호화하여 저장.
  -	회원가입 도중 TYPEORM에 있는 transaction을 이용하여 모든 관련 정보가 데이터베이스에 저장될 수 있도록 함. 데이터베이스에 저장하는 과정에서 에러가 발생할 경우 rollback을 통해 데이터를 저장하지 않음으로써 더미데이터가 저장되는 것을 방지.

- 로그인
  -	사용자가 입력한 이메일로 데이터베이스에 저장되어 있는 회원가입 정보를 불러옴
  -	bcrypt 패키지를 이용하여 데이터베이스에 저장된 암호화된 비밀번호와 사용자가 입력한 비밀번호를 대조 후 일치하는 비밀번호일 경우 JWT토큰을 발급. 
  -	토큰의 payload 값으로는 유저의 데이터베이스 상 아이디를 저장.

        
#### 메인페이지
- 메인페이지
  - 페이지네이션을 구현하여 프론트엔드에서 원하는 만큼 상품의 데이터 수를 불러올 수 있게 구현 
  
- 상품페이지
  - Query Parameter를 이용해 사용자가 상품의 가격순, 신상품순, 카테고리별로 원하는 상품을 호출 할 수 있도록 함.
  - 또 QueryBuilder를 customise하여 한가지 또는 여러가지 Query Parameter를 dynamic 하게 조합할 수 있도록 구현함. 
  - 상품을 장바구니로 저장할 때, 그 상품의 데이터를 이미 발급된 JWT 토큰을 통하여 payload 안에 저장되어 있는 유저의 아이디와 같이 데이터베이스에 저장.
  - 개별 상품에 접근할 때, parameter를 통해서 dynamic하게 원하는 상품의 상세 데이터를 호출.



#### 결제페이지
- 카트페이지
  - JWT 토큰에 저장된 payload 값을 통해서 사용자 별로 카트에 담은 상품을 볼 수 있게 구현.
  - 그리고 카트페이지 안에서 상품의 Update와 Delete를 구현. 

-결제페이지
  - 주문한 상품의 데이터를 받아서 만약 상품의 총 값이 사용자가 소지하고 있는 포인트보다 크면 계산이 되지 않게 구현.
  - 사용자의 포인트가 총 값 보다 많을 경우 그 데이터를 주문 창에 저장함. 이 과정에서 다시 한번 transaction을 사용하여 모든 데이터가 다른 테이블에 저장되지 않을 경우 rollback을 통해 더미 데이터가 쌓이는 것을 방지. 

