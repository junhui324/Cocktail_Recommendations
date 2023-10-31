## 1. 제작 목적

- React, TypeScript 공부 및 다양한 Open API 사용 경험을 위해 칵테일 추천 사이트를 제작해보았습니다.

## 2. 구성 페이지

- 메인 페이지
- 전체 칵테일 조회 페이지
- 날씨에 따른 추천 칵테일 페이지
- 랜덤 칵테일 추천 페이지
- 칵테일 퀴즈 페이지
- 칵테일 상세 페이지

## 3. 역할

- 날씨에 따른 추천 칵테일 페이지 구현
- 위치 및 날씨 관련 Open API를 사용하기 위한 함수 모듈화
- proxy 서버 셋업
- Redux toolkit 셋업
- 반응형 UI

## 4. 사용된 Open API

- 칵테일 API
- openweathermap API
- 카카오 local API
- vWorld Geocoder API

## 5. 사용 기술 스택

- React.js
- TypeScript
- Redux toolkit
- SCSS

## 6. 날씨에 따른 추천 칵테일 페이지 기능 설명

1. **랜딩 페이지**

![image](https://github.com/junhui324/Cocktail_Recommendations/assets/122953242/33999ce6-eb99-4580-b110-9e4a4f90cf9b)


- 현재 지역 / 온도 / 날씨 : openweathermap API 사용
- 날씨에 따른 칵테일 추천 기능
    - 칵테일 API 사용
    - glass 옵션으로 칵테일 정보 받아오는 코드
        
        ```jsx
        async function getCocktailWithWeather(mainWeather: string) {
          const weatherToDrinkMap = new Map<string, string>([
            ['Thunderstorm', 'Coffee_mug'],
            ['Tornado', 'Coffee_mug'],
            ['Rain', 'Coffee_mug'],
            ['Squall', 'Coffee_mug'],
            ['Drizzle', 'Collins_glass'],
            ['Mist', 'Collins_glass'],
            ['Smoke', 'Collins_glass'],
            ['Fog', 'Collins_glass'],
            ['Haze', 'Collins_glass'],
            ['Snow', 'Irish_coffee_cup'],
            ['Clear', 'Cocktail_glass'],
            ['Clouds', 'Highball_glass'],
            ['Dust', 'Highball_glass'],
            ['Sand', 'Highball_glass'],
            ['Ash', 'Highball_glass'],
          ]);
        
          try {
            const glassOption = weatherToDrinkMap.get(mainWeather);
            if (glassOption) {
              const res = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassOption}`
              );
              const response = await res.json();
              return response.drinks;
            }
          } catch (err) {
            throw new Error('Glass 옵션 칵테일 API 통신 에러');
          }
        }
        ```
        

2. **주소 검색 기능**

![image](https://github.com/junhui324/Cocktail_Recommendations/assets/122953242/e2bfc42c-5fbf-4390-a8fb-18bc3a931eb0)


- 카카오 주소검색 API 사용
- 주소 검색 로직
    - 주소 검색해서 주소 추출
    - → 추출한 주소를  vWorld Geocoder API를 이용해서 위도, 경도로 변환
    - → 변환된 주소에 openweathermap API를 이용해서 날씨 구하기
    - → 구한 날씨에 맞게 칵테일 API를 호출해서 날씨에 맞는 칵테일 받아오기
      
![ezgif com-video-to-gif (4)](https://github.com/junhui324/Cocktail_Recommendations/assets/122953242/b7225a16-68b7-462f-95e5-29a7580eb3db)


3. **기타 기능**
- 현재 시각
- 칵테일 별 상세 페이지 이동
- 페이지네이션
- SCSS 기반 반응형 UI
