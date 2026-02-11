# 설문 폼 Google Sheets 연동 가이드

## 1단계: Google 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 첫 번째 행에 다음 헤더를 입력:
   ```
   A1: 제출일시
   B1: 법인명
   C1: 이름
   D1: 직책
   E1: 직장 이메일
   F1: 연락처
   ```

## 2단계: Apps Script 설정

1. 스프레드시트에서 **확장 프로그램 > Apps Script** 클릭
2. 기본 코드를 삭제하고 아래 코드를 붙여넣기:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // 데이터 행 추가
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.companyName || '',
      data.name || '',
      data.position || '',
      data.email || '',
      data.phone || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **저장** 클릭 (💾 아이콘)
4. 프로젝트 이름 입력 (예: "커머스 리포트 설문")

## 3단계: Web App 배포

1. Apps Script 편집기에서 **배포 > 새 배포** 클릭
2. 설정:
   - **유형 선택**: 웹 앱
   - **실행 계정**: 나
   - **액세스 권한**: 모든 사용자
3. **배포** 클릭
4. **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/...`)

## 4단계: Vercel 환경 변수 설정

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** > **Environment Variables** 이동
4. 새 환경 변수 추가:
   - **Key**: `GOOGLE_SCRIPT_SURVEY_URL`
   - **Value**: 복사한 웹 앱 URL
   - **Environments**: Production, Preview, Development 모두 선택
5. **Save** 클릭

## 5단계: 재배포

환경 변수를 추가한 후 Vercel에서 재배포가 필요합니다:
- Vercel에서 자동으로 재배포되거나
- Git push를 통해 수동으로 재배포

## 테스트

1. `/commerce/2026-commerce-report-v2` 페이지 접속
2. 설문 폼 작성 및 제출
3. Google Sheets에서 데이터 확인

## 문제 해결

### Apps Script 수정 후 변경사항이 반영되지 않는 경우
1. **배포 > 배포 관리** 클릭
2. 기존 배포의 연필 아이콘(✏️) 클릭
3. **버전**: "새 버전" 선택
4. **배포** 클릭

### 개발 환경에서 테스트
- 개발 환경에서는 Google Sheets 없이도 테스트 가능
- 제출된 데이터는 서버 콘솔에 출력됨
