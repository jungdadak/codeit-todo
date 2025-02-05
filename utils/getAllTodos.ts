import { GetAll_ListSchema, TodoItemList } from './schemas';
import { ApiResponse } from './types';

/**
 * Swagger 스펙에 따라 queryParam 추가
 * @param page 디폴트 1
 * @param pageSize 디폴트 10
 * @returns 아이템 리스트
 */
export async function getAllTodos(
  page: number = 1,
  pageSize: number = 10
  //TodoItemList 를 반환하거나 에러를 반환함을 명시
): Promise<ApiResponse<TodoItemList>> {
  const API_URL = process.env.API_URL;
  const TENANT_ID = process.env.TENANT_ID;

  /**
   * 클라이언트에게 Tenant_Id , API를 숨기기 위해 환경변수로 지정
   * 환경변수 에러 필터링
   */
  if (!API_URL || !TENANT_ID) {
    return { error: '환경변수 등록 하셨나요' };
  }
  /**
   * 메인페이지 랜더링을 위한 api/{teneantId}/items 엔드포인트에 요청
   *
   */
  try {
    const res = await fetch(
      `${API_URL}/${TENANT_ID}/items?page=${page}&pageSize=${pageSize}`
    );
    if (!res.ok) {
      return { error: `API 요청 실패: ${res.status}` };
    }

    //직렬화 기다리기
    const TodoItems = await res.json();

    /**
     * zod 스키마로 직렬화된 응답이 swagger 스키마와 일치하는지검증합니다.
     * utils getAllTodos의 스키마를 활용합니다.
     */
    const parsedData = GetAll_ListSchema.safeParse(TodoItems);
    if (!parsedData.success) {
      return { error: 'API 응답 이상한데요(getallitem)' };
    }

    return parsedData.data;
  } catch (error) {
    return { error: '서버가 죽었거나 이상한데로 요청함' };
  }
}
