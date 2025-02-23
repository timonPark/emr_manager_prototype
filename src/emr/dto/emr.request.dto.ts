import { IsString, IsNotEmpty, IsDateString, IsInt, Min, Max, IsEnum } from 'class-validator';
import { EmrComCode, Gender } from '../../emr-user/enum/emr-user.enum';
 // 적절한 위치로 import

export class EmrInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;  // 필요에 따라 날짜 포맷을 체크하려면 더 구체적인 validation 추가 가능

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsInt()
  @Min(0)
  bloodSugar: number;

  @IsInt()
  @Min(0)
  diastolicBloodPressure: number;

  @IsInt()
  @Min(0)
  systolicBloodPressure: number;

  @IsDateString()
  @IsNotEmpty()
  implementationDate: string;
}

export class EmrRequestDto {
  @IsEnum(EmrComCode)
  @IsNotEmpty()
  emrComCode: EmrComCode;

  @IsString()
  @IsNotEmpty()
  ykiho: string;

  @IsNotEmpty()
  emrInfo: EmrInfoDto;
}
