# 커머스 리포트 다운로드 페이지 - Google Sheets 연동 설정 가이드

## 📋 개요

이 페이지는 사용자가 폼을 작성하면 Google Sheets에 자동으로 데이터를 저장합니다.

## 🔧 Google Sheets 연동 설정

### 1단계: Google 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. 새 스프레드시트 생성
3. 첫 번째 행에 다음 헤더를 입력:
   ```
   A1: 제출일시
   B1: 이름
   C1: 회사명
   D1: 이메일
   E1: 연락처
   F1: 직무
   ```

### 2단계: Apps Script 설정

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
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || '',
      data.position || ''
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
4. 프로젝트 이름 입력 (예: "커머스 리포트 다운로드")

### 3단계: Web App 배포

1. Apps Script 편집기에서 **배포 > 새 배포** 클릭
2. 설정:
   - **유형 선택**: 웹 앱
   - **설명**: "커머스 리포트 폼 수집"
   - **실행 계정**: 나
   - **액세스 권한**: 모든 사용자
3. **배포** 클릭
4. **액세스 승인** 클릭 후 Google 계정 로그인
5. **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/AKfy...../exec`)

### 4단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성 (없으면):

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

복사한 웹 앱 URL을 `YOUR_SCRIPT_ID` 부분에 붙여넣기

### 5단계: 개발 서버 재시작

```bash
npm run dev
```

## ✅ 테스트

1. 브라우저에서 `http://localhost:3001/commerce/2026-commerce-report` 접속
2. "무료 다운로드" 버튼 클릭
3. 폼 작성 후 제출
4. Google Sheets에서 데이터 확인

## 🚀 배포 시 주의사항

Vercel 또는 다른 호스팅에 배포할 때:

1. 환경 변수 설정에서 `GOOGLE_SCRIPT_URL` 추가
2. 배포 후 폼 테스트 진행

## 📝 추가 설정 (선택사항)

### PDF 자동 다운로드

리포트 PDF 파일을 준비한 후:

1. PDF 파일을 `public/reports/` 폴더에 저장
2. `DownloadModal.tsx`에서 TODO 주석 부분 수정:

```typescript
// 기존
// TODO: 실제 PDF 다운로드 로직 추가
// window.open('/reports/commerce-benchmark-2026.pdf', '_blank');

// 변경
window.open('/reports/commerce-benchmark-2026.pdf', '_blank');
```

### 이메일 자동 발송

Google Apps Script에서 Gmail API를 사용하여 자동 이메일 발송 가능:

```javascript
function sendEmail(email, name) {
  const subject = "커머스 벤치마크 리포트 2026";
  const body = `${name}님, 리포트를 다운로드해주셔서 감사합니다.`;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}
```

## 🔒 보안

- Apps Script는 Google의 보안 인프라를 사용합니다
- 환경 변수(.env.local)는 절대 Git에 커밋하지 마세요
- .gitignore에 `.env*.local`이 포함되어 있는지 확인하세요

## 문제 해결

### "Google Sheets 연동이 설정되지 않았습니다" 오류

- `.env.local` 파일이 존재하는지 확인
- `GOOGLE_SCRIPT_URL` 값이 올바른지 확인
- 개발 서버를 재시작했는지 확인

### 데이터가 저장되지 않음

- Apps Script 배포 시 "액세스 권한: 모든 사용자"로 설정했는지 확인
- 웹 앱 URL이 `/exec`로 끝나는지 확인
- Google Sheets의 Apps Script 실행 로그 확인

## 📞 지원

문제가 계속되면 개발팀에 문의하세요.
