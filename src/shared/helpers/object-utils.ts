export abstract class ObjectUtils {
  static deepCopyHelper<T>(valueToCopy: T): T {
    const copiedObject = JSON.parse(JSON.stringify(valueToCopy));

    return copiedObject;
  }
}
