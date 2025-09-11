import AddAuthor from "../../components/AddAuthor/AddAuthor"
import GetAuthors from "../../components/GetAuthors/GetAuthors"


function Authors() {

    return (
        <div className="flex flex-col gap-5">
            <AddAuthor />
            <GetAuthors />
        </div>
    )
}

export default Authors