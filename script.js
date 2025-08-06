// 게임 상태 관리
const gameState = {
    player: {
        hp: 20,
        maxHp: 20,
        atk: 5,
        gold: 0
    },
    monster: {
        name: '',
        hp: 0,
        maxHp: 0,
        atk: 0
    },
    battle: {
        inProgress: false,
        turn: 0
    }
};

// 몬스터 데이터
const monsters = {
    slime: {
        name: '슬라임',
        hp: 10,
        atk: 2,
        reward: 100,
        image: 'C:/Users/Admin/Desktop/final game v.1.0/슬라임.png'
    },
    golem: {
        name: '골렘',
        hp: 100,
        atk: 20,
        reward: 1000,
        image: 'C:/Users/Admin/Desktop/final game v.1.0/골렘.png'
    },
    'demon-lord': {
        name: '마왕',
        hp: 1000,
        atk: 100,
        reward: 0, // 마왕은 게임 클리어 조건
        image: 'C:/Users/Admin/Desktop/final game v.1.0/마왕.png'
    }
};

// DOM 요소 참조
const elements = {
    // 메인 메뉴
    questBtn: document.getElementById('quest-btn'),
    trainingBtn: document.getElementById('training-btn'),
    innBtn: document.getElementById('inn-btn'),
    
    // 영역
    questArea: document.getElementById('quest-area'),
    battleArea: document.getElementById('battle-area'),
    trainingArea: document.getElementById('training-area'),
    innArea: document.getElementById('inn-area'),
    gameClear: document.getElementById('game-clear'),
    
    // 플레이어 정보
    playerGold: document.getElementById('player-gold'),
    statsHp: document.getElementById('stats-hp'),
    statsAtk: document.getElementById('stats-atk'),
    goldDisplay: document.getElementById('gold-display'),
    
    // 전투 정보
    playerHp: document.getElementById('player-hp'),
    playerAtk: document.getElementById('player-atk'),
    monsterName: document.getElementById('monster-name'),
    monsterHp: document.getElementById('monster-hp'),
    monsterAtk: document.getElementById('monster-atk'),
    battleLog: document.getElementById('battle-log'),
    attackBtn: document.getElementById('attack-btn'),
    backFromBattleBtn: document.getElementById('back-from-battle'),
    
    // 돌아가기 버튼
    backFromQuestBtn: document.getElementById('back-from-quest'),
    backFromTrainingBtn: document.getElementById('back-from-training'),
    backFromInnBtn: document.getElementById('back-from-inn'),
    
    // 숙소 버튼
    healBtn: document.getElementById('heal-btn'),
    
    // 재시작 버튼
    restartBtn: document.getElementById('restart-btn')
};

// 게임 초기화
function initGame() {
    // 플레이어 초기 상태 설정
    gameState.player.hp = 20;
    gameState.player.maxHp = 20;
    gameState.player.atk = 5;
    gameState.player.gold = 0;
    
    // UI 업데이트
    updatePlayerStats();
    
    // 모든 영역 숨기기
    hideAllAreas();
    
    // 게임 클리어 상태 초기화
    elements.gameClear.classList.add('hidden');
}

// 모든 영역 숨기기
function hideAllAreas() {
    elements.questArea.classList.add('hidden');
    elements.battleArea.classList.add('hidden');
    elements.trainingArea.classList.add('hidden');
    elements.innArea.classList.add('hidden');
}

// 플레이어 스탯 업데이트
function updatePlayerStats() {
    elements.playerGold.textContent = gameState.player.gold;
    elements.statsHp.textContent = gameState.player.hp;
    elements.statsAtk.textContent = gameState.player.atk;
    elements.goldDisplay.textContent = gameState.player.gold;
    
    // 전투 중일 때 전투 화면의 스탯도 업데이트
    if (gameState.battle.inProgress) {
        elements.playerHp.textContent = gameState.player.hp;
        elements.playerAtk.textContent = gameState.player.atk;
    }
}

// 전투 시작
function startBattle(monsterType) {
    // 몬스터 정보 가져오기
    const monster = monsters[monsterType];
    
    // 몬스터 상태 설정
    gameState.monster.name = monster.name;
    gameState.monster.hp = monster.hp;
    gameState.monster.maxHp = monster.hp;
    gameState.monster.atk = monster.atk;
    gameState.monster.type = monsterType;
    gameState.monster.reward = monster.reward;
    
    // 전투 상태 설정
    gameState.battle.inProgress = true;
    gameState.battle.turn = 0;
    
    // 몬스터 이미지 설정
    document.getElementById('monster-image').src = monster.image;
    
    // 플레이어 이미지 설정
    document.getElementById('player-image').src = '/C:/Users/Admin/Downloads/플레이어.png';
    
    // UI 업데이트
    elements.monsterName.textContent = monster.name;
    elements.monsterHp.textContent = monster.hp;
    document.getElementById('monster-max-hp').textContent = monster.hp;
    elements.monsterAtk.textContent = monster.atk;
    elements.playerHp.textContent = gameState.player.hp;
    document.getElementById('player-max-hp').textContent = gameState.player.maxHp;
    elements.playerAtk.textContent = gameState.player.atk;
    
    // 체력 막대 업데이트
    updateHealthBars();
    
    // 전투 로그 초기화
    clearBattleLog();
    addToBattleLog(`${monster.name}와(과) 전투가 시작되었습니다!`);
    
    // 전투 영역 표시
    hideAllAreas();
    elements.battleArea.classList.remove('hidden');
    elements.backFromBattleBtn.classList.add('hidden');
    elements.attackBtn.classList.remove('hidden');
}

// 체력 막대 업데이트
function updateHealthBars() {
    const playerHealthPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    const monsterHealthPercent = (gameState.monster.hp / gameState.monster.maxHp) * 100;
    
    document.getElementById('player-hp-bar').style.width = `${playerHealthPercent}%`;
    document.getElementById('monster-hp-bar').style.width = `${monsterHealthPercent}%`;
}

// 전투 로그 초기화
function clearBattleLog() {
    elements.battleLog.innerHTML = '';
}

// 전투 로그 추가
function addToBattleLog(message, className = '') {
    const logEntry = document.createElement('p');
    logEntry.textContent = message;
    if (className) {
        logEntry.classList.add(className);
    }
    elements.battleLog.appendChild(logEntry);
    elements.battleLog.scrollTop = elements.battleLog.scrollHeight;
}

// 공격 처리
function attack() {
    if (!gameState.battle.inProgress) return;
    
    // 공격 버튼 비활성화 (연속 클릭 방지)
    elements.attackBtn.disabled = true;
    
    // 플레이어 공격 애니메이션
    const playerImg = document.querySelector('.player-character img');
    const monsterImg = document.querySelector('.monster-character img');
    const playerDamage = gameState.player.atk;
    
    // 플레이어 공격 애니메이션 시작
    playerImg.classList.add('player-attack');
    
    // 애니메이션 종료 후 데미지 적용 및 로그 추가
    setTimeout(() => {
        // 애니메이션 클래스 제거
        playerImg.classList.remove('player-attack');
        
        // 몬스터 데미지 적용
        gameState.monster.hp = Math.max(0, gameState.monster.hp - playerDamage);
        addToBattleLog(`플레이어가 ${gameState.monster.name}에게 ${playerDamage}의 피해를 입혔습니다!`, 'damage-text');
        
        // 몬스터 HP 업데이트
        elements.monsterHp.textContent = gameState.monster.hp;
        updateHealthBars();
        
        // 몬스터 사망 확인
        if (gameState.monster.hp <= 0) {
            elements.attackBtn.disabled = false;
            endBattle(true);
            return;
        }
        
        // 몬스터 공격 애니메이션 시작 (플레이어 공격 후 약간의 딜레이)
        setTimeout(() => {
            monsterImg.classList.add('monster-attack');
            
            // 몬스터 공격 애니메이션 종료 후 데미지 적용
            setTimeout(() => {
                // 애니메이션 클래스 제거
                monsterImg.classList.remove('monster-attack');
                
                // 플레이어 데미지 적용
                const monsterDamage = gameState.monster.atk;
                gameState.player.hp = Math.max(0, gameState.player.hp - monsterDamage);
                addToBattleLog(`${gameState.monster.name}가(이) 플레이어에게 ${monsterDamage}의 피해를 입혔습니다!`, 'damage-text');
                
                // 플레이어 HP 업데이트
                elements.playerHp.textContent = gameState.player.hp;
                updateHealthBars();
                updatePlayerStats();
                
                // 플레이어 사망 확인
                if (gameState.player.hp <= 0) {
                    elements.attackBtn.disabled = false;
                    endBattle(false);
                    return;
                }
                
                // 턴 증가
                gameState.battle.turn++;
                
                // 공격 버튼 다시 활성화
                elements.attackBtn.disabled = false;
            }, 500); // 몬스터 공격 애니메이션 시간
        }, 300); // 플레이어 공격과 몬스터 공격 사이의 딜레이
    }, 500); // 플레이어 공격 애니메이션 시간
}

// 전투 종료
function endBattle(victory) {
    gameState.battle.inProgress = false;
    
    if (victory) {
        // 승리 처리
        if (gameState.monster.type === 'demon-lord') {
            // 마왕 처치 시 게임 클리어
            addToBattleLog('축하합니다! 마왕을 물리쳤습니다!', 'victory-text');
            setTimeout(() => {
                hideAllAreas();
                elements.gameClear.classList.remove('hidden');
            }, 2000);
        } else {
            // 일반 몬스터 처치 시 보상 지급
            gameState.player.gold += gameState.monster.reward;
            addToBattleLog(`${gameState.monster.name}를 물리쳤습니다!`, 'victory-text');
            addToBattleLog(`보상으로 ${gameState.monster.reward} 골드를 획득했습니다!`, 'victory-text');
            
            // 체력 회복 기능 제거
            updatePlayerStats();
            updateHealthBars();
            
            // 돌아가기 버튼 표시
            elements.attackBtn.classList.add('hidden');
            elements.backFromBattleBtn.classList.remove('hidden');
        }
    } else {
        // 패배 처리
        addToBattleLog('플레이어가 쓰러졌습니다...', 'defeat-text');
        
        // 체력 회복 기능 제거
        updatePlayerStats();
        
        // 돌아가기 버튼 표시
        elements.attackBtn.classList.add('hidden');
        elements.backFromBattleBtn.classList.remove('hidden');
    }
}

// 훈련 처리
function train(stat, amount, cost) {
    // 골드 확인
    if (gameState.player.gold < cost) {
        alert('골드가 부족합니다!');
        return;
    }
    
    // 골드 차감
    gameState.player.gold -= cost;
    
    // 훈련 성공 확률 계산
    let successRate;
    if (cost === 100) {
        // 기본 훈련: 50% 성공률
        successRate = 0.5;
    } else {
        // 고급 훈련: 25% 성공률
        successRate = 0.25;
    }
    
    // 훈련 성공 여부 결정
    const isSuccess = Math.random() < successRate;
    
    if (isSuccess) {
        // 훈련 성공 시 스탯 증가
        if (stat === 'hp') {
            gameState.player.hp += amount;
            gameState.player.maxHp += amount;
            alert(`훈련 성공! 체력이 ${amount} 증가했습니다!`);
        } else if (stat === 'atk') {
            gameState.player.atk += amount;
            alert(`훈련 성공! 공격력이 ${amount} 증가했습니다!`);
        }
    } else {
        // 훈련 실패
        alert('훈련에 실패했습니다. 골드만 소모되었습니다.');
    }
    
    // UI 업데이트
    updatePlayerStats();
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 메인 메뉴 버튼
    elements.questBtn.addEventListener('click', () => {
        hideAllAreas();
        elements.questArea.classList.remove('hidden');
    });
    
    elements.trainingBtn.addEventListener('click', () => {
        hideAllAreas();
        elements.trainingArea.classList.remove('hidden');
    });
    
    elements.innBtn.addEventListener('click', () => {
        hideAllAreas();
        elements.innArea.classList.remove('hidden');
    });
    
    // 체력 회복 버튼
    elements.healBtn.addEventListener('click', () => {
        gameState.player.hp = gameState.player.maxHp;
        updatePlayerStats();
        alert('체력이 완전히 회복되었습니다!');
    });
    
    // 몬스터 선택 버튼
    document.querySelectorAll('.monster-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 체력이 0 이하인 경우 전투 불가
            if (gameState.player.hp <= 0) {
                alert('체력이 부족하여 전투를 할 수 없습니다. 숙소에서 체력을 회복하세요.');
                return;
            }
            const monsterType = btn.getAttribute('data-monster');
            startBattle(monsterType);
        });
    });
    
    // 공격 버튼
    elements.attackBtn.addEventListener('click', attack);
    
    // 훈련 버튼
    document.querySelectorAll('.train-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const stat = btn.getAttribute('data-stat');
            const amount = parseInt(btn.getAttribute('data-amount'));
            const cost = parseInt(btn.getAttribute('data-cost'));
            train(stat, amount, cost);
        });
    });
    
    // 돌아가기 버튼
    elements.backFromQuestBtn.addEventListener('click', () => {
        hideAllAreas();
    });
    
    elements.backFromTrainingBtn.addEventListener('click', () => {
        hideAllAreas();
    });
    
    elements.backFromBattleBtn.addEventListener('click', () => {
        hideAllAreas();
    });
    
    elements.backFromInnBtn.addEventListener('click', () => {
        hideAllAreas();
    });
    
    // 재시작 버튼
    elements.restartBtn.addEventListener('click', () => {
        initGame();
    });
}

// 게임 시작
function startGame() {
    initGame();
    setupEventListeners();
}

// 페이지 로드 시 게임 시작
window.addEventListener('load', startGame);