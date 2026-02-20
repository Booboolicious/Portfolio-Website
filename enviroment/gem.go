package gem

import (
	"encoding/json"
	"fmt"
	"strings"
)

// 1. Create a struct named 'Server' to match the JSON below.
type Server struct {
	Name string `json:"server_name"`
	CPU int `json:"cpu_usage"`
}
// 2. Remember to use struct tags!

func main() {
    jsonData := `{"server_name": "Alpha-1", "cpu_usage": 85}`

    // 3. Unmarshal the jsonData into a Server struct variable.
	var s Server
	// var s map[string]any
	err := json.NewDecoder(strings.NewReader(jsonData)).Decode(&s)
	if err !=nil {
		fmt.Println("failed:", err)
	}
    
    // 4. Print the CPU usage.
	fmt.Println(s)
}