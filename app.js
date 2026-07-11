// ==========================================
// 1. Data Model & Global State (Hackathon Optimized)
// ==========================================

const fullOntologyModel = {
    theme: { id: "T_AI", label: "온디바이스 AI", x: 15, y: 50, desc: "테마 분야" },
    roles: [
        { id: "R_CHIP", label: "칩 제조사", x: 45, y: 24, desc: "밸류체인 역할" },
        { id: "R_TEST", label: "반도체 검사부품", x: 45, y: 50, desc: "밸류체인 역할" },
        { id: "R_DSN", label: "반도체 IP 설계", x: 45, y: 76, desc: "밸류체인 역할" },
    ],
    stocks: [
        { id: "S_SEC", label: "삼성전자", x: 70, y: 22, size: "대형주", roleId: "R_CHIP" },
        { id: "S_LNO", label: "리노공업", x: 88, y: 40, size: "중형주", roleId: "R_TEST" },
        { id: "S_ISC", label: "ISC", x: 88, y: 62, size: "중형주", roleId: "R_TEST" },
        { id: "S_OPE", label: "오픈엣지테크놀로지", x: 88, y: 82, size: "소형주", roleId: "R_DSN" }
    ],
    edges: [
        { from: "T_AI", to: "R_CHIP", label: "소속됨" },
        { from: "T_AI", to: "R_TEST", label: "소속됨" },
        { from: "T_AI", to: "R_DSN", label: "소속됨" },
        { from: "R_CHIP", to: "S_SEC", label: "공시: 파운드리 마스터 계약" },
        { from: "R_TEST", to: "S_LNO", label: "금감원 DART: 초미세 검사 핀 독점 확인" },
        { from: "R_TEST", to: "S_ISC", label: "사업보고서: 메모리용 러버소켓 공급선" },
        { from: "R_DSN", to: "S_OPE", label: "공시: NPU 설계 라이선스 공급" },
        // Inter-stock SUPPLY_TO relations
        { from: "S_LNO", to: "S_SEC", label: "SUPPLY_TO: 검사 핀/소켓 공급" },
        { from: "S_ISC", to: "S_SEC", label: "SUPPLY_TO: 러버 소켓 공급" },
        { from: "S_OPE", to: "S_SEC", label: "SUPPLY_TO: LPDDR5 설계 IP 공급" }
    ]
};

// Marketplace ETFs Database (Pivoted to Social Community Feed)
const marketplaceEtfs = {
    "cxl-index": {
        id: "cxl-index",
        title: "CXL 2.0 차세대 제어 인터페이스 셋",
        owner: "@SuperGemi",
        likes: "👍 45개",
        desc: "메모리 확장 프로토콜 연동성이 확약된 독립 리서치 소스 검증 비중 지수 파일",
        summary: "차세대 D-RAM 메모리 확장 프로토콜인 CXL 2.0 연동 장비/칩 기업군을 타겟팅합니다. 대규모 데이터센터 클라우드 서버 납품이 조기 확약된 파운드리 및 고성능 메모리 제어 컨트롤러 중심 포트폴리오로, 장기 성장이 기대되는 지수 셋입니다.",
        weights: [
            { name: "네오셈", weight: "45%" },
            { name: "엑시콘", weight: "35%" },
            { name: "오픈엣지테크놀로지", weight: "20%" }
        ],
        yields: {
            "1w": "+1.8%",
            "1m": "+5.4%",
            "6m": "+18.2%",
            "1y": "+32.4%"
        }
    },
    "hbm3e-index": {
        id: "hbm3e-index",
        title: "HBM3E 패키징 핵심 장비 정합 지수",
        owner: "@QuantKing",
        likes: "👍 88개",
        desc: "국내 대형 리서치 다단계 공시 데이터 기반 가중치 추출 족보 지수 데이터",
        summary: "고대역폭 메모리 HBM3E 패키징 공정의 특수 접착(TC 본딩) 및 검사 장비 국산화 핵심 기업을 타겟팅합니다. 대형 제조사의 오더 물량 증폭 팩트를 기반으로 단가 인상이 예상되는 하이엔드 장비 공급망 비중 지수입니다.",
        weights: [
            { name: "한미반도체", weight: "50%" },
            { name: "에스티아이", weight: "30%" },
            { name: "피에스케이홀딩스", weight: "20%" }
        ],
        yields: {
            "1w": "-0.5%",
            "1m": "+8.2%",
            "6m": "+24.6%",
            "1y": "+45.1%"
        }
    },
    "custom-index": {
        id: "custom-index",
        title: "온디바이스 AI 강소기업 인덱스",
        owner: "나",
        likes: "👍 12개",
        desc: "DART 추출 반도체 후공정 소켓 및 설계자산 타겟팅 팩트체크 기반 최적 지수 배분 비율셋",
        summary: "삼성전자 등 무거운 대형주 흐름을 배제하고, 실질적으로 납품 팩트가 공시로 입증된 알짜 강소 부품 및 IP 설계사만을 적출하여 구성했습니다. 반도체 테스트 핵심 소켓 독점 공급망인 리노공업과 ISC가 75%의 높은 비중을 차지하여 확실한 실적 성장을 추적하며, 국산 NPU 자산 IP를 보유한 오픈엣지가 성장의 탄력을 더합니다.",
        weights: [
            { name: "리노공업", weight: "40%" },
            { name: "ISC", weight: "35%" },
            { name: "오픈엣지테크놀로지", weight: "25%" }
        ],
        yields: {
            "1w": "+2.3%",
            "1m": "+6.8%",
            "6m": "+22.1%",
            "1y": "+38.5%"
        }
    }
};

let userHasPublished = false;
let isTyping = false;
let currentScenario = 'etf'; // 'etf' or 'general'
let currentMarketPeriod = '1m'; // Default period

// ==========================================
// 2. Authentication Gate Logic
// ==========================================
function handleDemoLogin() {
    const loginScreen = document.getElementById('login-screen');
    const header = document.getElementById('main-header');
    
    loginScreen.style.opacity = '0';
    setTimeout(() => {
        loginScreen.style.display = 'none';
        header.classList.add('authenticated');
        switchMainTab('tab-chat', document.querySelector('.tab-btn'));
    }, 500);
}

// ==========================================
// 3. Tab Routing / Navigation System
// ==========================================
function switchMainTab(targetTabId, element) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeContent = document.getElementById(targetTabId);
    activeContent.classList.add('active');
    element.classList.add('active');

    if (targetTabId === 'tab-graph') {
        setTimeout(renderFullscreenOntology, 50);
    }
}

// ==========================================
// 4. Chatbot Builder & RAG Inference Logic
// ==========================================

function injectDemoQuestion(type) {
    if (isTyping) return;
    
    currentScenario = type;
    const inputField = document.getElementById('live-chat-input');
    
    let textToType = "";
    if (type === 'etf') {
        textToType = "요즘 온디바이스 AI 장비 부품주 뉴스 많이 나오던데, 삼전 말고 실제 대기업 공급망 밑단에서 알짜로 실속 챙기는 강소기업 위주로 필터링해서 포트폴리오 짜줘.";
    } else {
        textToType = "리노공업의 밸류체인상 역할이 뭐야? 그리고 전방 산업하고 관련된 다른 종목들도 알려줘.";
    }
    
    inputField.value = "";
    isTyping = true;
    let index = 0;
    
    const typeInterval = setInterval(() => {
        inputField.value += textToType[index];
        index++;
        if (index >= textToType.length) {
            clearInterval(typeInterval);
            isTyping = false;
            inputField.focus();
        }
    }, 15);
}

function triggerLiveMessage() {
    const inputField = document.getElementById('live-chat-input');
    const query = inputField.value.trim();
    if (!query || isTyping) return;

    const chatScroller = document.getElementById('real-chat-scroller');

    // 1. Append User Message
    const userBubble = document.createElement('div');
    userBubble.className = 'bubble user';
    userBubble.textContent = query;
    chatScroller.appendChild(userBubble);
    inputField.value = "";
    chatScroller.scrollTop = chatScroller.scrollHeight;

    // Detect scenario type based on keywords if user typed manually
    if (query.includes('리노') && query.includes('역할')) {
        currentScenario = 'general';
    } else if (query.includes('포트폴리오') || query.includes('삼전') || query.includes('강소기업')) {
        currentScenario = 'etf';
    }

    // 2. Append Thinking Indicator
    const thinkingBubble = document.createElement('div');
    thinkingBubble.className = 'bubble bot thinking-bubble';
    thinkingBubble.id = 'thinking-indicator';
    thinkingBubble.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;
    chatScroller.appendChild(thinkingBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    // 3. Simulated API Response delay
    setTimeout(() => {
        const indicator = document.getElementById('thinking-indicator');
        if (indicator) indicator.remove();

        const botBubble = document.createElement('div');
        botBubble.className = 'bubble bot';

        if (currentScenario === 'etf') {
            botBubble.innerHTML = `
                <div class="rag-header koscom">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 8v4l3 3"></path>
                    </svg>
                    Graph-RAG 가이드라인 규제 필터링 가동
                </div>
                자본시장법 및 금감원 가이드라인에 의거하여 개인 인적 사항 수집을 완전 배제하고, 신뢰도가 높은 기업 정보(DART 공시 및 최근 분기 사업보고서)를 기반으로 탐색을 실행했습니다.<br><br>
                질문하신 조건에 따라 **대형주(삼성전자)**를 포트폴리오 자산 배분 대상에서 자동 소거 필터링하고, 공급망 핵심 [반도체 검사부품] 레이어에서 독점적 기술을 가진 **리노공업**과 **ISC**, [반도체 IP 설계] 레이어의 **오픈엣지테크놀로지**를 검출했습니다.
                도출된 자산 배분 비중 분석 데이터셋이 우측 미리보기 패널에 렌더링되었습니다.
            `;
            chatScroller.appendChild(botBubble);
            buildEtfPreviewContent();
        } else {
            botBubble.innerHTML = `
                <div class="rag-header">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 8v4l3 3"></path>
                    </svg>
                    DART 기반 밸류체인 분석 결과
                </div>
                공시 보고서 분석 결과, **리노공업(중형주)**은 반도체 생태계에서 **[반도체 검사부품]** 역할군에 속합니다. 반도체 패키징 및 다이 상태에서 칩 작동 여부를 최종 테스트하기 위한 검사 핀(리노핀) 및 테스트 소켓을 국내외 주요 칩 제조사에 독점 공급하고 있습니다.<br><br>
                전방 산업은 **[온디바이스 AI]** 분야이며, 관련 밸류체인 내의 주요 종목 관계는 다음과 같습니다:
                - **상위 전방 칩 제조사**: 삼성전자 (파운드리 및 칩 설계)
                - **동일 검사부품 경쟁/협력사**: ISC (메모리 테스트용 실리콘 러버 소켓 강자)
                - **설계 레이어 협력사**: 오픈엣지테크놀로지 (저전력 NPU 설계자산 라이선스 보유)
                
                자세한 연동 지도 및 기업 간 연결 고리는 상단의 **[🗺️ 밸류체인 온톨로지]** 탭에서 한눈에 확인하실 수 있습니다.
            `;
            chatScroller.appendChild(botBubble);
            resetEtfPreviewContent();
        }
        
        chatScroller.scrollTop = chatScroller.scrollHeight;
    }, 1500);
}

function buildEtfPreviewContent() {
    const previewArea = document.getElementById('etf-preview-area');
    previewArea.style.opacity = "1";
    previewArea.innerHTML = `
        <div class="preview-card-container">
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                <span class="orange-dot" style="width:6px; height:6px; background:var(--primary); border-radius:50%;"></span>
                온디바이스 AI 강소기업 인덱스
            </div>
            <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:16px; line-height: 1.4;">
                알고리즘: 대형주 소거 ➔ 검사부품/IP설계 역할 분산 ➔ 시가총액 체급 비중 정규화
            </p>
            
            <div class="item-row">
                <div>
                    <strong style="color: var(--text-main); font-size: 0.92rem;">리노공업 (중형주)</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">초미세 테스트 핀 DART 공급 정보 매핑</div>
                </div>
                <div class="item-badge">40%</div>
            </div>
            
            <div class="item-row">
                <div>
                    <strong style="color: var(--text-main); font-size: 0.92rem;">ISC (중형주)</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">실리콘 러버 테스트 소켓 핵심 공급망 점유</div>
                </div>
                <div class="item-badge">35%</div>
            </div>
            
            <div class="item-row">
                <div>
                    <strong style="color: var(--text-main); font-size: 0.92rem;">오픈엣지테크놀로지 (소형주)</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">저전력 NPU IP 코어 국산화 비중 가중</div>
                </div>
                <div class="item-badge">25%</div>
            </div>
        </div>
    `;
    
    document.getElementById('btn-mcp-publish').style.display = 'flex';
}

function resetEtfPreviewContent() {
    const previewArea = document.getElementById('etf-preview-area');
    previewArea.style.opacity = "0.4";
    previewArea.innerHTML = `
        <p style="text-align: center; padding: 60px 0; color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
            대화창에서 분석 질문을 전송하면,<br>AI 규칙 기반 자산 비중이 이곳에 즉시 계산됩니다.
        </p>
    `;
    document.getElementById('btn-mcp-publish').style.display = 'none';
}

// ==========================================
// 5. ETF Preview Collapsible Panel Functions
// ==========================================
function toggleRightPanel() {
    const rightPanel = document.getElementById('chat-right-panel');
    const floatingBtn = document.getElementById('expand-floating-btn');
    
    rightPanel.classList.add('collapsed');
    floatingBtn.style.display = 'flex';
}

// ==========================================
// 6. MCP Community Feed & Returns Logic
// ==========================================

function changeMarketPeriod(period) {
    currentMarketPeriod = period;
    
    document.querySelectorAll('.period-btn').forEach(btn => {
        if (btn.getAttribute('data-period') === period) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    Object.keys(marketplaceEtfs).forEach(etfId => {
        const etf = marketplaceEtfs[etfId];
        const badge = document.getElementById(`yield-badge-${etfId}`);
        if (badge) {
            const yieldValue = etf.yields[period];
            badge.innerText = yieldValue;
            
            if (yieldValue.startsWith('+')) {
                badge.style.color = '#e11d48';
                badge.style.background = '#fff1f2';
                badge.style.borderColor = 'rgba(225, 29, 72, 0.15)';
            } else {
                badge.style.color = '#2563eb';
                badge.style.background = '#eff6ff';
                badge.style.borderColor = 'rgba(37, 99, 235, 0.15)';
            }
        }
    });
}

function openEtfDetail(etfId) {
    const etf = marketplaceEtfs[etfId];
    if (!etf) return;

    const modal = document.getElementById('etf-detail-modal');
    const title = document.getElementById('modal-etf-title');
    const owner = document.getElementById('modal-etf-owner');
    const price = document.getElementById('modal-etf-price');
    const summary = document.getElementById('modal-etf-summary');
    const yields = document.getElementById('modal-etf-yield');
    const weightsList = document.getElementById('modal-etf-weights-list');

    title.innerText = etf.title;
    owner.innerText = `OWNER: ${etf.owner}`;
    price.innerText = `추천수: ${etf.likes}`;
    summary.innerHTML = etf.summary;
    
    const currentYield = etf.yields[currentMarketPeriod];
    yields.innerText = `${getPeriodText(currentMarketPeriod)} 수익률: ${currentYield}`;
    if (currentYield.startsWith('+')) {
        yields.className = "modal-yield positive";
    } else {
        yields.className = "modal-yield negative";
    }

    weightsList.innerHTML = "";
    etf.weights.forEach(w => {
        const row = document.createElement('div');
        row.className = "modal-weight-row";
        row.innerHTML = `
            <span class="weight-name">${w.name}</span>
            <span class="weight-bar-bg"><span class="weight-bar" style="width: ${w.weight};"></span></span>
            <span class="weight-percent">${w.weight}</span>
        `;
        weightsList.appendChild(row);
    });

    modal.style.display = 'flex';
}

function closeEtfDetail() {
    document.getElementById('etf-detail-modal').style.display = 'none';
}

function getPeriodText(period) {
    switch (period) {
        case '1w': return '1주';
        case '1m': return '1개월';
        case '6m': return '6개월';
        case '1y': return '1년';
        default: return '1개월';
    }
}

function expandRightPanel() {
    const rightPanel = document.getElementById('chat-right-panel');
    const floatingBtn = document.getElementById('expand-floating-btn');
    
    rightPanel.classList.remove('collapsed');
    floatingBtn.style.display = 'none';
}

// MCP Publish flow (Pivoted to Social Feed Sharing)
function executeMcpTabLink() {
    const overlay = document.getElementById('mcp-overlay');
    const statusText = document.getElementById('mcp-status-text');
    const mcpIndicator = document.getElementById('mcp-indicator');

    overlay.style.display = 'flex';
    
    statusText.innerText = "⚡ MCP 프로토콜: 커뮤니티 피드 공유 개시...";
    mcpIndicator.innerHTML = '<span class="indicator-pulse" style="background:#f59e0b"></span> 원격 공유 중...';
    mcpIndicator.style.color = '#f59e0b';
    mcpIndicator.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    mcpIndicator.style.background = 'rgba(245, 158, 11, 0.1)';

    setTimeout(() => {
        statusText.innerText = "🔐 MCP 원격 보안 채널 매핑 및 스마트 계약 체결 중...";
    }, 1200);

    setTimeout(() => {
        statusText.innerText = "🎉 공유 성공! 소셜 인베스팅 커뮤니티 피드로 자동 이동 처리됩니다. (+50 크레딧 적립)";
    }, 2400);

    setTimeout(() => {
        overlay.style.display = 'none';
        
        mcpIndicator.innerHTML = '<span class="indicator-pulse"></span> 제도권 가이드라인 최적화 샌드박';
        mcpIndicator.style.color = 'var(--accent)';
        mcpIndicator.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        mcpIndicator.style.background = 'rgba(16, 185, 129, 0.1)';

        if (!userHasPublished) {
            insertCustomIndexCard();
            userHasPublished = true;
        }

        const marketTabBtn = document.querySelectorAll('.tab-btn')[2];
        switchMainTab('tab-market', marketTabBtn);
    }, 3600);
}

function insertCustomIndexCard() {
    const marketGrid = document.getElementById('market-grid-container');
    const customCard = document.createElement('div');
    customCard.className = "market-card-box mine";
    customCard.setAttribute('onclick', "openEtfDetail('custom-index')");
    customCard.setAttribute('style', 'cursor: pointer;');
    
    const yieldVal = marketplaceEtfs['custom-index'].yields[currentMarketPeriod];
    let yieldStyle = `color: #e11d48; background: #fff1f2; border-color: rgba(225, 29, 72, 0.15);`;
    if (yieldVal.startsWith('-')) {
        yieldStyle = `color: #2563eb; background: #eff6ff; border-color: rgba(37, 99, 235, 0.15);`;
    }

    customCard.innerHTML = `
        <div class="market-card-header">
            <span style="color: var(--accent); display: flex; align-items: center; gap: 4px;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
                내 공유 인덱스
            </span>
            <div style="display:flex; gap:8px; align-items:center;">
                <span id="yield-badge-custom-index" class="yield-badge-style" style="font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:12px; border:1px solid; ${yieldStyle}">${yieldVal}</span>
                <span style="color: var(--primary); font-weight: 800;">👍 12개</span>
            </div>
        </div>
        <h4 class="market-card-title">온디바이스 AI 강소기업 인덱스</h4>
        <p class="market-card-desc">
            DART 정량 데이터 추출 기반 반도체 후공정 소켓 강소업체 및 NPU 코어 IP 기업 최적 배분 비율 셋 (리노공업 40%, ISC 35%, 오픈엣지 25%).
        </p>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px dashed rgba(16, 185, 129, 0.4); padding: 12px; border-radius: 10px; font-size: 0.82rem; text-align: center; color: var(--accent); font-weight: 700;">
            🕊️ 커뮤니티 공유 완료 (상세 분석 클릭 조회)
        </div>
    `;
    
    marketGrid.insertBefore(customCard, marketGrid.firstChild);
}

// ==========================================
// 7. Interactive 3-Layer Value Chain Ontology
// ==========================================
function renderFullscreenOntology() {
    const viewport = document.getElementById('dashboard-viewport');
    if (!viewport) return;
    
    viewport.innerHTML = "";

    const svgOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOverlay.setAttribute("class", "svg-connection-overlay");
    viewport.appendChild(svgOverlay);

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    function getAbsolutePos(nodeId) {
        let node;
        if (fullOntologyModel.theme.id === nodeId) {
            node = fullOntologyModel.theme;
        } else {
            node = fullOntologyModel.roles.find(r => r.id === nodeId) || 
                   fullOntologyModel.stocks.find(s => s.id === nodeId);
        }
        
        if (!node) return { x: 0, y: 0 };
        return {
            x: (node.x / 100) * width,
            y: (node.y / 100) * height
        };
    }

    // 1. Draw SVG Connection Lines & add Fact Labels
    fullOntologyModel.edges.forEach(edge => {
        const pStart = getAbsolutePos(edge.from);
        const pEnd = getAbsolutePos(edge.to);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", pStart.x);
        line.setAttribute("y1", pStart.y);
        line.setAttribute("x2", pEnd.x);
        line.setAttribute("y2", pEnd.y);
        
        // Differentiate hierarchical relation vs supply-chain relation
        if (edge.label.startsWith("SUPPLY_TO:")) {
            line.setAttribute("class", "edge-line supply-relation");
        } else {
            line.setAttribute("class", "edge-line");
        }
        
        svgOverlay.appendChild(line);

        const descEl = document.createElement('div');
        descEl.className = "edge-desc";
        
        // Hide "SUPPLY_TO:" prefix inside label text to look clean
        const labelText = edge.label.startsWith("SUPPLY_TO:") ? 
                          edge.label.replace("SUPPLY_TO:", "공급:").trim() : 
                          edge.label;
        descEl.innerText = labelText;
        descEl.style.left = `${(pStart.x + pEnd.x) / 2}px`;
        descEl.style.top = `${(pStart.y + pEnd.y) / 2}px`;

        descEl.addEventListener('mouseenter', () => {
            line.classList.add('active');
        });
        descEl.addEventListener('mouseleave', () => {
            line.classList.remove('active');
        });

        viewport.appendChild(descEl);
    });

    // 2. Render Nodes
    createDomNode(fullOntologyModel.theme, "theme", `<span style="font-size:0.7rem; color:var(--theme-color); font-weight:600; display:block; margin-top:2px;">${fullOntologyModel.theme.desc}</span>`);
    
    fullOntologyModel.roles.forEach(role => {
        createDomNode(role, "role", `<span style="font-size:0.7rem; color:var(--primary); font-weight:600; display:block; margin-top:2px;">${role.desc}</span>`);
    });

    fullOntologyModel.stocks.forEach(stock => {
        createDomNode(stock, "stock", `<span class="node-sub">${stock.size}</span>`);
    });

    function createDomNode(nodeData, className, extraHtml) {
        const div = document.createElement('div');
        div.className = `node-obj ${className}`;
        div.style.left = `${nodeData.x}%`;
        div.style.top = `${nodeData.y}%`;
        div.innerHTML = `${nodeData.label} ${extraHtml}`;
        
        div.addEventListener('mouseenter', () => {
            highlightConnectedLines(nodeData.id, true);
        });
        div.addEventListener('mouseleave', () => {
            highlightConnectedLines(nodeData.id, false);
        });

        viewport.appendChild(div);
    }

    function highlightConnectedLines(nodeId, active) {
        const lines = svgOverlay.querySelectorAll('.edge-line');
        fullOntologyModel.edges.forEach((edge, idx) => {
            if (edge.from === nodeId || edge.to === nodeId) {
                if (active) {
                    lines[idx].classList.add('active');
                } else {
                    lines[idx].classList.remove('active');
                }
            }
        });
    }
}

window.addEventListener('resize', () => {
    const graphTab = document.getElementById('tab-graph');
    if (graphTab && graphTab.classList.contains('active')) {
        renderFullscreenOntology();
    }
});
