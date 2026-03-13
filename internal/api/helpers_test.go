package api

import (
	"reflect"
	"testing"
)

func TestFindCategory(t *testing.T) {
	tests := []struct {
		name     string
		m        map[string]any
		target   string
		expected any
		found    bool
	}{
		{
			name: "Target at root level",
			m: map[string]any{
				"category1": "value1",
				"category2": "value2",
			},
			target:   "category1",
			expected: "value1",
			found:    true,
		},
		{
			name: "Target in nested map",
			m: map[string]any{
				"root": map[string]any{
					"nested1": "nestedValue1",
					"nested2": "nestedValue2",
				},
				"other": "value",
			},
			target:   "nested2",
			expected: "nestedValue2",
			found:    true,
		},
		{
			name: "Target not found",
			m: map[string]any{
				"category1": "value1",
				"category2": "value2",
			},
			target:   "nonexistent",
			expected: nil,
			found:    false,
		},
		{
			name: "Empty map",
			m:    map[string]any{},
			target: "anything",
			expected: nil,
			found: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, found := FindCategory(tt.m, tt.target)
			if found != tt.found {
				t.Errorf("FindCategory() found = %v, expectedFound %v", found, tt.found)
			}
			if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("FindCategory() result = %v, expected %v", result, tt.expected)
			}
		})
	}
}
