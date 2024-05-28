import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField.jsx';
import render from '@/utils/test/render.jsx';

/**
 * 2.3. setup과 teardown
 * (1) before-each, before-all, after-each, after-all 함수를 이용하여 테스트 전후에 실행할 함수를 설정할 수 있음
 * (2) 앱 전역적으로 세팅하는 경우, vitest.config.js, setupTest.js 파일을 만들어서 설정함
 */

/** setup
 * // beforeEach
 * // (1) 최상단에 선언 : 하단 선언된 각 테스트 블록 실행 전 무조건 실행됨.
 * // (2) describe 함수 내부에서 선언 : describe 블록이 실행 되기전에 실행됨. 해당 scope 내에서만 실행됨.
 * // # beforeEach(() => { })
 * // beforeAll
 * // (1) 하단 선언된 테스트 블록 실행 전, 한번만 실행됨, 테스트 컴포넌트 실행 시 한번만 실행
 * // (2) beforeEach 와 동시에 실행되는 경우는 먼저 실행됨
 * // (3) 전역으로 공유할 수 있는 데이터를 설정할 때 사용
 * // # beforeAll(() => { })
 */

/** teardown
 * // afterEach
 * // (1) 각 테스트가 완료된 후, 실행됨
 * // (2) 상태를 초기화 함
 * # afterEach(() => { })
 * // afterAll
 * // (1) 모든 테스트가 완료된 후, 딱 한번만 실행됨
 * #afterAll(() => { })
 */

// 각 테스트에 공통적으로 실행하는 구문을 beforeEach에 작성
// 그러나 전역변수를 선언하여 내부에서 이용하는 것은 좋지 않다. 전역변수를 리셋하지 않는 경우 다른 테스트에 영향을 줄 수 있기 때문.
beforeEach(async () => {
  await render(<TextField className="my-class"/>);
});

it('className prop으로 설정한 css class 가 적용된다.', async () => {
  // 1. Arrange 단계
  // await render(<TextField className="my-class"/>);

  // 2. Act 단계
  // 3. Assert 단계
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // 4. 결과 확인
  expect(textInput).toHaveClass('my-class');
});

describe('placeholder 테스트', () =>{
  beforeEach(async () => {
    await render(<TextField placeholder='상품명을 입력해주세요.'/>);
  });

  it('기본 placeholder "텍스트를 입력해 주세요." 가 표시된다.', async () => {
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    screen.debug();
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder props 에 따라 placeholder 텍스트메시지가 변경된다.', async () => {
    // await render(<TextField placeholder='상품명을 입력해주세요.'/>);
    const textInput = screen.getByPlaceholderText('상품명을 입력해주세요.');
    screen.debug();
    expect(textInput).toBeInTheDocument();
  });
});
