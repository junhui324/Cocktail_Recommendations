/**
 * 랜덤으로 칵테일 하나를 반환하는 API 통신을 진행하는 함수
 * @returns 랜덤으로 선택된 칵테일 하나의 정보를 담은 배열
 */
export async function getRandomCockTail() {
  try {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    const response = await res.json();

    // return response.drinks;
    return response.drinks[0];
  } catch (err) {
    throw new Error('랜덤 칵테일 API 통신 에러');
  }
}

/**
 * 칵테일의 카테고리 목록을 반환하는 API 통신을 진행하는 함수
 * @returns 카테고리 목록에 대한 정보를 담은 배열
 */
export async function getCateogry() {
  try {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );

    const response = await res.json();

    return response.drinks;
  } catch (err) {
    throw new Error('카테고리 목록 API 통신 에러');
  }
}

/**
 * 칵테일의 알코올 여부 목록을 반환하는 API 통신을 진행하는 함수
 * @returns 알코올 여부 목록에 대한 정보를 담은 배열
 */
export async function getAlcoholState() {
  try {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list'
    );

    const response = await res.json();

    return response.drinks;
  } catch (err) {
    throw new Error('알코올 여부 목록 API 통신 에러');
  }
}

/**
 * 알파벳을 이용하여 전체 칵테일 정보를 반환하는 API 통신을 진행하는 함수
 * @returns 전체 칵테일 정보를 담고 있는 배열
 */
export async function getWholeCocktailUsingAlphabet() {
  let wholeCocktail: any[] = [];

  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  try {
    const response = await Promise.all(
      alphabet.map((item) => {
        return fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${item}`
        );
      })
    );

    await Promise.all(
      response.map(async (res) => {
        const json = await res.json();

        if (json.drinks !== null) {
          wholeCocktail.push(...json.drinks);
        }
      })
    );

    return wholeCocktail;
  } catch (err) {
    throw new Error('전체 데이터 fetch 중 에러 발생');
  }
}

/**
 * 유저가 선택한 옵션을 반영하여 랜덤 칵테일을 생성하는 함수
 * @param categoryOpt 카테고리 옵션
 * @param alcoholOpt 알코올 여부 옵션
 * @returns 모든 옵션을 만족하는 칵테일 정보
 */
export async function getRandomCocktailWithFavour(
  categoryOpt: string,
  alcoholOpt: string
) {
  if (categoryOpt === 'All' && alcoholOpt !== 'All') {
    try {
      const wholeCocktail = await getWholeCocktailUsingAlphabet();

      const filteredCocktail = wholeCocktail.filter(
        (cocktail) => cocktail.strAlcoholic === alcoholOpt
      );

      return makeRandomCocktailWithOption(filteredCocktail);
    } catch (err) {
      throw new Error('취향 반영 랜덤 칵테일 생성 중 에러 발생');
    }
  }

  if (categoryOpt !== 'All' && alcoholOpt === 'All') {
    try {
      const wholeCocktail = await getWholeCocktailUsingAlphabet();

      const filteredCocktail = wholeCocktail.filter(
        (cocktail) => cocktail.strCategory === categoryOpt
      );

      return makeRandomCocktailWithOption(filteredCocktail);
    } catch (err) {
      throw new Error('취향 반영 랜덤 칵테일 생성 중 에러 발생');
    }
  }

  try {
    const wholeCocktail = await getWholeCocktailUsingAlphabet();

    const filteredCocktail = wholeCocktail.filter(
      (cocktail) =>
        cocktail.strCategory === categoryOpt &&
        cocktail.strAlcoholic === alcoholOpt
    );

    return makeRandomCocktailWithOption(filteredCocktail);
  } catch (err) {
    throw new Error('취향 반영 랜덤 칵테일 생성 중 에러 발생');
  }
}

/**
 * 옵션이 적용되어 필터링된 칵테일 중 랜덤으로 하나를 골라 반환하는 함수
 * @param filteredCocktail 옵션이 적용되어 필터링된 칵테일 배열
 * @returns 랜덤으로 선택된 칵테일 데이터 하나
 */
async function makeRandomCocktailWithOption(filteredCocktail: any) {
  const randomIndex = Math.floor(Math.random() * filteredCocktail.length);

  return filteredCocktail[randomIndex];
}

/**
 * 해당 칵테일의 모든 정보를 반환하는 함수
 * @param id 칵테일 id
 * @returns 칵테일 상세정보
 */
// export async function getCocktailDescription(id: number) {
export async function getCocktailDescription() {
  const drink = await fetch(
    // `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`
  )
    .then((res) => res.json())
    .then((data) => data.drinks[0])
    .catch((e) => console.log('Error: ', e));

  return drink;
}

/**
 * 해당 칵테일에 들어가는 재료 및 재료량을 반환하는 함수
 * @param id 칵테일 id
 * @returns 칵테일 재료, 재료량
 */
export async function getCocktailIngredients() {
  const drink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`
  )
    .then((res) => res.json())
    .then((data) => data.drinks[0])
    .catch((e) => console.log('Error: ', e));

  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }
  return { ingredients, measures };
}

/**
 * 해당 재료의 이미지를 반환하는 함수
 * @param name 재료 name
 * @returns 재료 이미지
 */
