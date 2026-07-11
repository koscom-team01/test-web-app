# 팀 구성 및 협업 방식 (Collaboration & Roles)

본 문서는 `kosLINK AI` 미니 프로젝트 개발을 위한 6인 팀의 역할 정의, Git 브랜치 전략, 그리고 컴포넌트 간 API 규격을 정의하여 효율적인 협업 체계를 구축하는 것을 목표로 합니다.

---

## 1. 팀원 역할 분담 (Team Roles & Responsibilities)

프로젝트의 성격과 난이도에 따라 다음과 같이 6인의 R&R을 명확히 정의합니다.

```
                  ┌──────────────────────┐
                  │      PM / Leader     │
                  └──────────┬───────────┘
                             │
       ┌──────────────┬──────┴───────┬──────────────┐
       ▼              ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│   데브옵스   │ │ 프론트엔드 │ │ AI 백엔드  │ │ 마켓 백엔드│
│    (1인)   │ │    (1인)   │ │   (2인)    │ │   (2인)    │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

### ① 데브옵스 (DevOps) - 1인
- **주요 업무**: 금융 클라우드 인프라 배포 및 공급망 자동화 환경 구축
- **상세 R&R**:
  - Naver Cloud Platform(금융망) VPC 및 Subnet, 로드밸런서 설계 (Terraform IaC 관리).
  - RKE2 기반 Kubernetes 클러스터 기동 및 노드 오토스케일링 제어.
  - Harbor 사설 저장소 구축 및 쿠버네티스용 Self-Hosted GitHub Actions Runner 배포.
  - ArgoCD GitOps 파이프라인 구성 및 웹 애플리케이션 자동 롤링 업데이트 배포.

### ② 프론트엔드 (Frontend) - 1인
- **주요 업무**: 프리미엄 UI/UX 구현 및 비즈니스 인터랙션 연동
- **상세 R&R**:
  - 코스콤 주황색 테마 기반의 라이트 모드 웹 퍼블리싱.
  - 상단 고정 헤더, 로그인 게이트, 3대 독립 탭 라우팅 인터랙션 설계.
  - 챗봇 입력창 타이핑 효과, 생각 중 애니메이션 및 접이식 ETF 미리보기 패널 컴포넌트 제작.
  - SVG/Canvas 기반의 3-Layer 반응형 온톨로지(종목 간 공급망 포함) 그래프 렌더링.
  - 마켓플레이스 기간 필터링 핸들러 및 상세 정보 조회 팝업 모달 연동.

### ③ AI 백엔드 (AI & Data Backend) - 2인
- **주요 업무**: 데이터 파이프라인 수집, Graph-RAG 및 챗봇 서버 구축
- **상세 R&R**:
  - Open DART API 기반 반도체 기업 공급 계약 및 정기공시 수집 스케줄러 개발.
  - Neo4j / RDF Graph DB에 온톨로지 노드 및 엣지 데이터를 적재하고 Cypher 쿼리 튜닝.
  - LLM(Gemini API)을 활용해 신규 공시 텍스트에서 공급-수요 관계(SUPPLY_TO)를 JSON으로 파싱하는 파이프라인 구현.
  - 챗봇 질의 수신 시 온톨로지 가드레일을 조회하여 환각을 차단하는 Graph-RAG 엔진 및 챗봇 API 연동.

### ④ 마켓플레이스 백엔드 (Marketplace & MCP Backend) - 2인
- **주요 업무**: 마켓플레이스 인덱스 데이터베이스 관리 및 MCP 원격 액션 연동
- **상세 R&R**:
  - 마켓플레이스 상장 인덱스 데이터 및 사용자 보유 지식 자산 포트폴리오 스키마 설계.
  - 기간별(1주~1년) 시뮬레이션 수익률 데이터 정밀 연산 및 API 제공.
  - Model Context Protocol(MCP) 규격을 준수하는 원격 API 서버 개발 (AI가 마켓에 자동 상품 상장하도록 도구 기능 공급).
  - 결제 연출, 지식 IP 조회, 정산 관리 비즈니스 로직 작성.

---

## 2. API 규격 정의 및 통합 설계

### ① 챗봇 질의 API (`POST /api/chat`)
- **요청 (Request)**:
  ```json
  {
    "user_id": "demo_partner@startup-sandbox.io",
    "message": "삼전 빼고 온디바이스 AI 관련 알짜 강소기업 포트폴리오 짜줘"
  }
  ```
- **응답 (Response)**:
  ```json
  {
    "bot_response": "DART 기반 분석을 통해 삼성전자를 소거하고...",
    "scenario_type": "etf",
    "etf_preview": {
      "title": "온디바이스 AI 강소기업 인덱스",
      "assets": [
        {"name": "리노공업", "weight": "40%"},
        {"name": "ISC", "weight": "35%"},
        {"name": "오픈엣지테크놀로지", "weight": "25%"}
      ]
    }
  }
  ```

### ② MCP 상품 상장 API (`POST /api/mcp/publish`)
- **요청 (Request)**:
  ```json
  {
    "title": "온디바이스 AI 강소기업 인덱스",
    "owner": "나",
    "price": "1,500원",
    "weights": [
      {"name": "리노공업", "weight": "40%"},
      {"name": "ISC", "weight": "35%"},
      {"name": "오픈엣지테크놀로지", "weight": "25%"}
    ]
  }
  ```
- **응답 (Response)**:
  ```json
  {
    "status": "success",
    "registered_etf_id": "custom-index",
    "message": "MCP 원격 서명 완료 및 지식 IP 마켓플레이스 상장 성공"
  }
  ```

---

## 3. Git 협업 전략 및 커뮤니케이션 규칙

- **Git Branching Strategy**:
  - `main`: 운영서버 배포 브랜치 (ArgoCD 자동 동기화 타겟)
  - `dev`: 통합 개발 브랜치 (모든 feature 브랜치의 병합지)
  - `feature/devops-*`, `feature/fe-*`, `feature/ai-*`, `feature/market-*`: 개인별 업무 단위 신규 기능 구현용 브랜치
- **개발 환경 통일**:
  - 인프라 및 클러스터 연결을 위한 `team1-kubeconfig.yaml`과 VM SSH 접속용 개인 키는 깃허브에 올리지 않고 보안 공유 드라이브를 통해 DevOps가 관리/공유합니다.
  - 백엔드와 프론트엔드는 도커 환경에서 컨테이너 단위로 독립 빌드 검증을 거친 후 PR(Pull Request)을 병합합니다.
