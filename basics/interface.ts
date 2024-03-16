/**
 * @author huang
 * @date 2024-03-16
 */

interface DataSource {
    do(a: string, b: number): string
}

class UserDataSource implements DataSource {
    do(a: string, b: number): string {
        return ''
    }
}

class PostDataSource implements DataSource {
    do(a: string, b: number): string {
        return ''
    }
}
