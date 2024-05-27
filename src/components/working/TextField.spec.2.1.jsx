import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField.jsx';
import render from '@/utils/test/render.jsx';

/**
 * 2.1 단위테스트란 무엇일까 강의
 * className에 따른 css class 설정에 대한 단위테스트를 AAA패턴으로 작성해봄.
 * 1. 테스트 내용을 명확하게 할 디스크립션을 작성한다.
 * 2. 먼저 컴포넌트 렌더링, 다음 테스트 동작 발생, 마지막 원하는 결과가 나왔는지 확인.
 */

it('className prop으로 설정한 css class 가 적용된다.', async () => {
  // Arrange : test를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // Act : 테스트 동작 발생
  // -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // -> 클릭이나 메서드 호출, prop 변경 등에 대한 작업이 여기에 해당
  // Assert : 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

  // 1. Arrange 단계
  await render(<TextField className="my-class"/>);
  // render API를 호출 : 테스트를 위한 컴포넌트(TextFiled)를 렌더링
  // 테스트 목적인 클래스이름을 props로 전달함 (my-class)
  // render API : 테스트환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영
  // jsDOM : Node.js 에서 사용하기 위해 많은 웹표준을 순수 자바스크립트로 구현

  // 2. Act 단계
  // 3. Assert 단계
  // 테스트 대상이 되는 요소에 접근. 이때에 React 테스팅 라이브러리에서 제공하는 다양한 API를 사용할 수 있다.
  // screen.getByPlaceholderText('텍스트를 입력해 주세요.'); -> expect 함수에 넘김
  // 여기서는 placeholder text를 이용하여 특정 요소를 찾아서 조회함.

  // 4. 결과 확인
  // 대부분 테스트 라이브러리에서는 expect API를 사용하여 확인가능함. vitest 동일
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class'
  );
  // toHaveClass : Matcher, 렌더링된 요소에 지정된 CSS 클래스가 올바르게 적용되었는지 검증
  // className이란 내부 props나, state 값을 검증(x)
  // 렌더링되는 DOM구조가 올바르게 변경되었는지 확인(o) -> 최종적으로 사용자가 보는 결과는 DOM
});
